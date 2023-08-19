import { IsString, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ParentInfoDto } from './create-parant-info.dto';

export class CreateBrideDto {
  @IsString()
  bride_name: string;

  // @IsString()
  bride_code?: string;

  @IsString()
  girl_name: string;

  @IsString()
  boy_name: string;

  @ValidateNested({ each: true })
  @Type(() => ParentInfoDto)
  parents: ParentInfoDto
}
