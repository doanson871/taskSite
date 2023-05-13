import { IsNotEmpty, IsString } from 'class-validator';

export class insertWorkDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class work {
  @IsString()
  @IsNotEmpty()
  name: string;
}
