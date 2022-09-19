import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { unlink } from 'fs';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  // create an array of documents
  async create(files?: Array<Express.Multer.File>) {
    try {
      return await this.prisma.document.createMany({
        data: files.map((d) => {
          return {
            filename: d.filename,
            mimetype: d.mimetype,
            originalname: d.originalname,
            name: d.originalname,
            path: d.path,
            size: d.size,
          };
        }),
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  // find all documents
  async findAll() {
    try {
      return await this.prisma.document.findMany();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  // search for a document by a term
  async search(term: string) {
    return await this.prisma.document.findMany({
      // take only 10 that match the term
      take: 10,
      // filter with OR operator
      where: {
        OR: [
          {
            originalname: {
              contains: term,
              // needed for mongodb
              mode: 'insensitive',
            },
          },
          {
            filename: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  // update a file by id
  async update(id: string, dto: CreateDocumentDto, file?: Express.Multer.File) {
    try {
      // find the document
      let doc = await this.prisma.document.findUnique({ where: { id } });
      if (!doc) throw new NotFoundException('Document not found');

      // Check if new file was sent
      if (file) {
        // remove the old file associated with thsi record
        unlink(doc.path, (err) => {});
      }

      //update the doc
      return await this.prisma.document.update({
        where: { id: doc.id },
        data: {
          name: dto.name,
          description: dto.description,
          // File updates
          filename: file?.filename,
          mimetype: file?.mimetype,
          originalname: file?.originalname,
          path: file?.path,
          size: file?.size,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  // delete a single doc
  async remove(id: string) {
    try {
      // Find the document and delet it from the server
      let doc = await this.prisma.document.findUnique({ where: { id } });
      if (!doc) throw new NotFoundException('Document could not be found');
      //Remove from file system
      unlink(doc.path, (err) => {});

      return await this.prisma.document.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
