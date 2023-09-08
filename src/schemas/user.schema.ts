import { Document } from 'mongoose';
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {


  @Prop({unique:[true,"Duplicate email entered"]})
  email: string;

  @Prop()
  password: string;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
