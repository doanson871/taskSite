import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertMessageDto {
  @IsNotEmpty()
  @IsNumber()
  conversationId: number;

  @IsNotEmpty()
  content: string;
}
