import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertPostJobDTO {
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
  address?: string;

  @IsNumber()
  @IsOptional()
  workId?: number;

  @IsString()
  @IsOptional()
  descrition?: string;

  @IsOptional()
  status?: boolean;
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
