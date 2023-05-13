import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertApplicationDTO {
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateApplicationDTO {
  @IsString()
  @IsOptional()
  content?: string;
}
