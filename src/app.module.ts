import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './app/config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(config.MONGO_CNN),
    UsersModule
  ],
})
export class AppModule {}
