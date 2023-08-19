import { Document, ObjectId } from 'mongoose';
import { ParentInterface } from './parent.interface';
import { WeddingInformationInterface } from 'src/modules/wedding_information/interface/wedding_information.interface';

export interface BrideInterface extends Document {
  uuid: ObjectId;
  bride_name: string;
  girl_name: string;
  boy_name: string;
  bride_code: string;
  bride_initial: string;
  parents: ParentInterface[];
  information?: WeddingInformationInterface[]
}
