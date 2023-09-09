import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { promises } from 'dns';
import { BookingDocument } from 'src/schemas/booking.schema';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Req() req,
    @Body() createBookingDto: CreateBookingDto,
    ) {
    const {event,numberOfTickets}=createBookingDto
    console.log(createBookingDto);
    return this.bookingService.create(event,req.user._id,numberOfTickets);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findUserBookings (@Req() req):Promise<BookingDocument[]>{
    return this.bookingService.findUserBookings(req.user._id);
  }
  

  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
