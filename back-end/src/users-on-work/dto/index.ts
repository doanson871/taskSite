import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class InsertUserOnWorkDTO {
  @IsNumber()
  @IsNotEmpty()
  workId: number;

  @IsOptional()
  photoURL?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  priceExpected?: string;
}

export class UpdateUserOnWorkDTO {
  @IsNumber()
  @IsNotEmpty()
  workId: number;

  @IsOptional()
  photoURL?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  priceExpected?: string;
}
