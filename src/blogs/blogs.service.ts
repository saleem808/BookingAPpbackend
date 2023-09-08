import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blogs, BlogsDocument } from 'src/schemas/blog.schema';
import * as path from 'path';
import * as fs from 'fs';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blogs.name) private readonly BlogModel: Model<BlogsDocument>,
  ) {}
  async create(
    createBlogDto: CreateBlogDto,
    
    id: string,
  ): Promise<BlogsDocument> {
    // const thumbnailUrl = await this.uploadThumbnail(t);
    const post = new this.BlogModel({
      title: createBlogDto.title,
      // thumbnail: thumbnailUrl,
      description: createBlogDto.description,
      time:createBlogDto.time,
      date:createBlogDto.date,
      location:createBlogDto.location,
      coverImage:createBlogDto.coverImage,
      user: id,
    });

    return post.save();
  }
  async uploadThumbnail(thumbnail: Express.Multer.File): Promise<string> {
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uploadPath = path.join('uploads', uniqueFilename);

    await fs.promises.writeFile(uploadPath, thumbnail.buffer);

    return uploadPath;
  }

  async findAllBlogs(): Promise<Blogs[]> {
    const blogs = await this.BlogModel.find().populate("user");
    return blogs;
  }

  async searchAndFilterBlogs(
    searchTerm: string,
    selectedDate: string,
    selectedLocation: string,
  ) {
    let query = this.BlogModel.find().populate("user");

    // Handle search term if provided
    if (searchTerm) {
      query = query.or([
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ]);
    }

    // Handle selected date if provided
    if (selectedDate) {
      query = query.where('date').equals(selectedDate);
    }

    // Handle selected location if provided
    if (selectedLocation) {
      query = query.where('location').equals(selectedLocation);
    }

    // Execute the query and return the results
    const filteredBlogs = await query.exec();
    return filteredBlogs;
  }

  

  async findById(id: string): Promise<{}> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const event = ((await this.BlogModel.findById(id).populate("user")));

    if (!event) {
      throw new NotFoundException('Book not found.');
    }

    return event;
  }

  async updateBlog(id: string, blog: UpdateBlogDto): Promise<{message:string}> {
    await this.BlogModel.findByIdAndUpdate(id, blog, {
     new: true,
     runValidators: true,
   });
   return {message:"Blog is Updated successfully"};
 }
 async deleteEvent(id: string): Promise<{message:string}> {
  await this.BlogModel.findByIdAndDelete(id)
  return {message:"Event is Deleted successfully"};
 }
}

