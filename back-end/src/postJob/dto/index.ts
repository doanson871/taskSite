import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertPostJobDTO {
  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  workId: number;

  @IsString()
  @IsOptional()
  descrition?: string;

  @IsString()
  @IsOptional()
  thanhpho?: string;

  @IsString()
  @IsOptional()
  quanhuyen?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsOptional()
  photoURL?: string;
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

  @IsString()
  @IsOptional()
  thanhpho?: string;

  @IsString()
  @IsOptional()
  quanhuyen?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsOptional()
  photoURL?: string;
}

export class SearchPostJobDTO {
  @IsString()
  @IsOptional()
  thanhpho?: string;

  @IsString()
  @IsOptional()
  quanhuyen?: string;

  @IsOptional()
  salary?: any;

  @IsOptional()
  workId?: any;

  // @IsOptional()
  // workName?: string;
}
