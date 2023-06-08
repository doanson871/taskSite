import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertApplicationDTO {
  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  postJobId: number;
}

export class UpdateApplicationDTO {
  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  status?: any;
}
