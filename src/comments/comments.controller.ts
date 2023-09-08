import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommentDocument, Comments } from 'src/schemas/comment.scheema';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId') // Include a route parameter for the blog post ID
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string, // Retrieve the blog post ID from the route parameter
  ): Promise<CommentDocument> {
    return this.commentsService.create(createCommentDto, postId);
  }

  @Get()
  findAll(@Query() query) {
    return this.commentsService.findAll(query);
  }
  @Get(':id')
  async findOne(@Param('id') commentId: string) {
    return this.commentsService.findOne(commentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
