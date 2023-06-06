import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  photoURL?: string;

  @IsString()
  @IsOptional()
  thanhpho?: string;

  @IsString()
  @IsOptional()
  quanhuyen?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
