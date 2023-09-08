import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BlogsModules } from './blogs/blogs.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { CommentsModule } from './comments/comments.module';
import { BookingModule } from './booking/booking.module';


AuthModule;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MulterModule.register({
      dest: '/uploads'
    }),
    AuthModule,
    BlogsModules,
    CommentsModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
