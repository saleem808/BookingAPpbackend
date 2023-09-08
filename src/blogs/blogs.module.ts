import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blogs, BlogsSchema } from 'src/schemas/blog.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blogs.name, schema: BlogsSchema }]),
    AuthModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModules {}
