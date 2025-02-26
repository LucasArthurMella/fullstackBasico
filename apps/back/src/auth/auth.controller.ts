import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: UserDto ) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

}
