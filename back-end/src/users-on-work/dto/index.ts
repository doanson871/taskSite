import { IsNotEmpty, IsNumber } from 'class-validator';

export class InsertUserOnWorkDTO {
  @IsNumber()
  @IsNotEmpty()
  workId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateUserOnWorkDTO {
  @IsNumber()
  @IsNotEmpty()
  workId: number;
}
