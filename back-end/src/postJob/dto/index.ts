import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertPostJobDTO {
  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  workId: string;

  @IsString()
  @IsOptional()
  descrition?: string;
}

export class UpdatePostJobDTO {
  @IsString()
  @IsOptional()
  time?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  wordId?: number;

  @IsString()
  @IsOptional()
  descrition?: string;
}
