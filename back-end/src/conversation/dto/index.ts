import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConversationDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
