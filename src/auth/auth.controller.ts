import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from 'src/dto/signup.dto';
import { logInDto } from 'src/dto/login.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { updateUserDto } from 'src/dto/updateUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: signUpDto): Promise<{message: string;}> {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  login(@Body() logInDto: logInDto): Promise<{message: string,token:string, user: User}> {
    return this.authService.logIn(logInDto);
  }
  @Patch('updateUser/:id')
  updateUser(@Param() id: any, @Body() updateUserDto: updateUserDto): Promise<UserDocument> {
    return this.authService.updateUser(id?.id,updateUserDto);
  }
}
