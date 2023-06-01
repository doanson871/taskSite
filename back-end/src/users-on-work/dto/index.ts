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

  @IsOptional()
  status?: boolean;
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

  @IsOptional()
  status?: boolean;

  @IsOptional()
  isReadNotification?: boolean;
}
