import {IsNotEmpty, IsString, Length } from "class-validator";

export class CreateWishDto {
  // @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  nama: string

  // @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  ucapan: string

  @IsNotEmpty()
  @IsString()
  bride: string
}
