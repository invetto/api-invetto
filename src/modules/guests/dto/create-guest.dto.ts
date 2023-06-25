import { IsString, Length } from "class-validator";

export class CreateGuestDto {
  @IsString()
  @Length(3, 25)
  name: string
}