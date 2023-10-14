import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { WeddingInformationInterface } from '../interface/wedding_information.interface';
import { Transform } from 'class-transformer';

@Schema()
export class WeddingInformation extends Document implements WeddingInformationInterface {
  @Transform(({ value }) => value.toString())
  uuid: string;

  @Prop({ required: true })
  wedding_akad: string;

  @Prop({ required: true })
  wedding_akad_time: string;

  @Prop({ required: true })
  wedding_resepsi: string;

  @Prop({ required: true })
  wedding_resepsi_time: string;

  @Prop()
  wedding_resepsi_time_2: string;

  @Prop()
  wedding_location: string;

  @Prop()
  wedding_location_akad: string;

  @Prop({ required: true })
  start_event: number;

  @Prop({ required: true })
  end_event: number;

  @Prop()
  wedding_domicili: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Bride',
    required: true,
  })
  bride?: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
  })
  brideId?: string;

}

export const WeddingInformationSchema = SchemaFactory.createForClass(WeddingInformation);
