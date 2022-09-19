import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// class in charge of validation for user sent values
export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
