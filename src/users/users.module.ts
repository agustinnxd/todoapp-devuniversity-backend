import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/app/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET,
      signOptions: {expiresIn: '10m'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
