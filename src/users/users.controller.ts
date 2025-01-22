import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import { AuthGuard } from './users.guard';
import { LoginUserDto, loginUserSchema } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  };

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  };

  @Get('renew')
  @UseGuards(AuthGuard)
  renewToken(@Request() req: any) {
    return this.usersService.renewToken(req)
  }
}
