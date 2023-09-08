import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Req() req,
    // @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    console.log(req.user);
    // return
    return this.blogsService.create(createBlogDto,req.user._id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async findAll(): Promise<any[]> {
    return this.blogsService.findAllBlogs();
  }

  // Endpoint for searching and filtering blogs
  @Get('search')
  async searchBlogs(
    @Query('searchTerm') searchTerm: string,
    @Query('selectedDate') selectedDate: string,
    @Query('selectedLocation') selectedLocation: string,
  ) {
    const filteredBlogs = await this.blogsService.searchAndFilterBlogs(
      searchTerm,
      selectedDate,
      selectedLocation,
    );
    return filteredBlogs;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getBook(
    @Param('id')
    id: string,
  ): Promise<{}> {
    return this.blogsService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBlog(
    @Param('id')
    id: string,
    @Body()
    blog: UpdateBlogDto,
  ): Promise<{ message: string }> {
    return this.blogsService.updateBlog(id, blog);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Param('id')
    id: string,
  ): Promise<{message: string}> {
    return this.blogsService.deleteEvent(id);
  }





  
}
