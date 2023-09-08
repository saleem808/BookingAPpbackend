import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  Document,
  HydratedDocument,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';
import { User } from './user.schema';
import { Blogs } from './blog.schema';

export type CommentDocument = HydratedDocument<Comments>;

@Schema({timestamps: true})
export class Comments extends Document {
  @Prop({ required: true })
  comment: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Blogs' })
  post: Blogs;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);