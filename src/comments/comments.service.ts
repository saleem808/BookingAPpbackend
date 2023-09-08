import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from 'src/schemas/comment.scheema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentsModel: Model<CommentDocument>,
  ) {}
async create(
  createCommentDto: CreateCommentDto,
  postId: string, // Accept the blog post ID as a parameter
): Promise<CommentDocument> {
  console.log(postId);
  
  const comment = new this.commentsModel({
    comment: createCommentDto.comment,
    post: postId, // Set the blog post ID
    user:createCommentDto.user

  });

  await comment.save();
  return comment;
}


  async findAll(query) {
    const comments = await this.commentsModel
      .find(query)
   
    return comments;
  }

  async findOne(commentId: string): Promise<CommentDocument[]> {
    console.log(commentId);
    
    try {
      const comment = await this.commentsModel.find({post:commentId}).populate('user').populate('post');
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      return comment;
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
