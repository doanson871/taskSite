import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertPostJobDTO {
  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  workId: number;

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
  workId?: number;

  @IsString()
  @IsOptional()
  descrition?: string;
}

export class SearchPostJobDTO {
  @IsString()
  @IsOptional()
  address?: string;

  @IsOptional()
  workId?: any;

  @IsOptional()
  name?: string;
}
