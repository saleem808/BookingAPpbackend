import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly BookingModel: Model<BookingDocument>,
  ) {}
  async create(
    createBookingDto: CreateBookingDto,
    id: string,
    
  ): Promise<BookingDocument> {
    const post = new this.BookingModel({
      user: id,
      event:createBookingDto.event
      
    });
    return post.save();
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
