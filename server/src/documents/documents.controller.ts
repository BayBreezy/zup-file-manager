import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // Used to create a list of documents
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', null, {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const id = uuidv4();
          const ext = extname(file.originalname);
          const fileName = `${id}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  create(@UploadedFiles() files?: Array<Express.Multer.File>) {
    return this.documentsService.create(files);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get('search/:term')
  search(@Param('term') term: string) {
    return this.documentsService.search(term);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const id = uuidv4();
          const ext = extname(file.originalname);
          const fileName = `${id}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() dto: CreateDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.documentsService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
