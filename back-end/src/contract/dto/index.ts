import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertContractDTO {
  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  wordId: number;

  @IsString()
  @IsOptional()
  descrition?: string;
}

export class UpdateContractDTO {
  @IsNumber()
  @IsOptional()
  time: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsOptional()
  wordId: number;

  @IsString()
  @IsOptional()
  descrition?: string;
}
