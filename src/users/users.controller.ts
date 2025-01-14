import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id') 
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

}
