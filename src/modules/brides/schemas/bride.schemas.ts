import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { BrideInterface } from '../interface/bride.interface';
import { ParentInterface } from '../interface/parent.interface';
import { Transform } from 'class-transformer';

@Schema()
export class Bride extends Document implements BrideInterface {
  @Transform(({ value }) => value.toString())
  uuid: ObjectId;

  @Prop({ required: true })
  bride_name: string;

  @Prop({ required: true })
  girl_name: string;

  @Prop({ required: true })
  boy_name: string;

  @Prop({ required: true, unique: true })
  bride_code: string;

  @Prop()
  bride_initial: string;

  @Prop({
    required: true,
    type: {
      mother_of_girl: { type: String, required: true },
      mother_of_boy: { type: String, required: true },
      father_of_girl: { type: String, required: true },
      father_of_boy: { type: String, required: true },
    },
  })
  parents: ParentInterface[];
}

export const BrideSchema = SchemaFactory.createForClass(Bride);
