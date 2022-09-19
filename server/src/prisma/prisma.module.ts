import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //let the app know that this module is global and can be used in any service without being imported in the module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
