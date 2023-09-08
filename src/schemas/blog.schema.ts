import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Mongoose } from 'mongoose';
import mongoose from 'mongoose';
export type BlogsDocument = HydratedDocument<Blogs>;
@Schema({
  timestamps: true,
})
export class Blogs extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  coverImage: string; // Add the coverImage field

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  date: string; // Add the date field

  @Prop({ required: true })
  time: string; // Add the time field

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
}
export const BlogsSchema = SchemaFactory.createForClass(Blogs);
