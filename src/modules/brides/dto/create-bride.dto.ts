import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ParentInfoDto } from './create-parant-info.dto';

export class CreateBrideDto {
  @IsString()
  bride_name: string;

  @IsString()
  bride_code: string;

  @IsString()
  girl_name: string;

  @IsString()
  boy_name: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ParentInfoDto)
  parents: ParentInfoDto[];
}
