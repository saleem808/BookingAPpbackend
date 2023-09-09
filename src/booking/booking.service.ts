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
    event_id:string,
    id: string,
    numberOfTickets:string
    
  ): Promise<BookingDocument> {
    console.log(" services",numberOfTickets);
    
    const post = new this.BookingModel({
      user: id,
      blog:event_id,
      numberOfTickets:numberOfTickets
      
    });
    return post.save();
  }
  async findUserBookings(user:string):Promise<BookingDocument[]>{
    const bookings = this.BookingModel.find({ user:user }).populate("user")
    return bookings

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
