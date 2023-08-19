import { IsString, IsBoolean } from 'class-validator';

export class ParentInfoDto {
  @IsString()
  mother_of_girl: string;

  @IsString()
  mother_of_boy: string;

  @IsString()
  father_of_girl: string;

  @IsString()
  father_of_boy: string;
}
