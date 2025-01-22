import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDto.password, salt); // Encrypts the password

      const newUser = await this.userModel.create({ ...createUserDto, password: hash });

      const payload = { _id: newUser._id, username: newUser.name };

      return {
        newUser,
        access_token: await this.jwtService.signAsync(payload) // Generates JWT
      }

    } catch (error) {

      if (error.message.includes('E11000')) { // E11000 is mongodb's duplicated key error
        throw new BadRequestException("Email already exists")
      };

      throw new Error(error)

    }
  };

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) { 
      throw new BadRequestException('Invalid credentials //email') // if no user was found by the previous request it throws a 400 error
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) { 
      throw new BadRequestException('Invalid Credentials //password') // if the passwords don't match throws a 400 error
    } else {
      const { _id, email, name } = user;

      return {
        _id,
        email,
        name,
        access_token: await this.jwtService.signAsync({ _id, name })
      }
    }

  };

  // refreshes token
  async renewToken(req: any) {
    const {_id, name} = req.user;

    const access_token = await this.jwtService.signAsync({_id, name});

    return {
      _id,
      name,
      access_token,
    }
  }
}
