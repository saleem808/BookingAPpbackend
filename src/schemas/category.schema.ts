import { Document } from 'mongoose';
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

// export type UserDocument = User & Document;

@Schema()
export class Category extends Document {
  @Prop()
  category: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
