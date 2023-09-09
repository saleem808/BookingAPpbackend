import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Mongoose } from 'mongoose';
import mongoose from 'mongoose';
export type BookingDocument = HydratedDocument<Booking>;
@Schema({
  timestamps: true,
})
export class Booking extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Blog" })
  blog: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
  @Prop({ required: true })
  numberOfTickets: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
