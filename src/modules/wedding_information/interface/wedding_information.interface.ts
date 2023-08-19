import { Document, ObjectId, Schema } from 'mongoose';
import { BrideInterface } from 'src/modules/brides/interface/bride.interface';
import { ParentInterface } from 'src/modules/brides/interface/parent.interface';

export interface WeddingInformationInterface extends Document {
  _id?: ObjectId;
  wedding_akad: string;
  wedding_akad_time: string;
  wedding_resepsi: string;
  wedding_resepsi_time: string;
  wedding_resepsi_time_2: string;
  wedding_location?: string;
  wedding_location_akad?: string;
  start_event: number;
  end_event: number;
  wedding_domicili: string;
  bride: ObjectId
}

export interface BrideWeddingInfoInterface {
  uuid: ObjectId;
  bride_name: string;
  girl_name: string;
  boy_name: string;
  bride_code: string;
  bride_initial: string;
  parents: ParentInterface[];
  information?: WeddingInformationInterface
}

export function createBrideWeddingInterface(
  bride: BrideInterface,
  createdWeddingInfo: WeddingInformationInterface
): BrideWeddingInfoInterface {
  const brideWeddingInfo: BrideWeddingInfoInterface = {
    uuid: bride.uuid,
    bride_name: bride.bride_name,
    girl_name: bride.girl_name,
    boy_name: bride.boy_name,
    bride_code: bride.bride_code,
    bride_initial: bride.bride_initial,
    parents: bride.parents,
    information: createdWeddingInfo
  };

  return brideWeddingInfo;
}
