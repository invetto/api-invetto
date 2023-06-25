import { Schema, Document } from 'mongoose';

export interface GuestDocument extends Document {
  name: string;
}

export const GuestSchema = new Schema<GuestDocument>({
  name: { type: String, required: true }
})