import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateWeddingInformationDto {
  @IsString()
  wedding_akad: string;

  @IsString()
  wedding_akad_time: string;

  @IsString()
  wedding_resepsi: string;

  @IsString()
  wedding_resepsi_time: string;

  @IsOptional() // Marked as optional
  @IsString()
  wedding_resepsi_time_2: string;

  @IsOptional() // Marked as optional
  @IsString()
  wedding_location?: string;

  @IsOptional() // Marked as optional
  @IsString()
  wedding_location_akad?: string;

  @IsNumber()
  start_event: number;

  @IsNumber()
  end_event: number;

  @IsString()
  wedding_domicili: string;

  // @IsString()
  bride?: ObjectId; //mongoose

  @IsString()
  brideId: string; //spreadsheet
}
