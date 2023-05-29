import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createNotificationDTO {
  @IsNotEmpty()
  @IsNumber()
  reciverId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  postId: number;
}
