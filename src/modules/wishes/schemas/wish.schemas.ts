import { Schema, Document } from 'mongoose';

export interface WishDocument extends Document {
  nama: string;
  ucapan: string;
  bride: string;
}

export const WishSchema = new Schema<WishDocument>({
  nama: { type: String, required: true },
  ucapan: { type: String, required: true },
  bride: { type: String, required: true }
});