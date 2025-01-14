import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser
    } catch (error) {
      if (error.message.includes('E11000')) {
        throw new BadRequestException("Email already exists")
      };
      throw new Error(error)
    }
  };

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(id);
    
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      if (!user) {
        throw new NotFoundException("User not found")
      };

      return user
    } catch (error) {
      console.log(error);
      
      if (error.message === "User not found") {
        throw error
      }
      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid Id")
      }

      throw new Error(error.message)
    }
  }

}
