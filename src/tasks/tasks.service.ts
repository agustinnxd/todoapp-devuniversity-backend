import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto, req: any) {
    try {
      const newTask = await this.taskModel.create({ ...createTaskDto, user: req.user._id });
      return newTask
                          
    } catch (error) {

      if (error.message.includes("E11000")) { // E11000 is mongodb's duplicated key exception
        throw new BadRequestException("Task already exists") 
      }
      throw new Error(error.message)
    }


  }

  findAll(req: any) {
    return this.taskModel.find({
      user: req.user._id // finds all tasks created by the respective user
    }).populate('user');
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {

      const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { returnOriginal: false });

      if (!task) {
        throw new NotFoundException("Task not found") // if no task was found by the previous request, it throws a 404 error
      }

      return task
    } catch (error) {

      if (error.message === "Task not found") {
        throw error
      }
      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid Id")
      }
      if (error.message.includes("E11000")) {
        throw new BadRequestException("Task already exists")
      }

      throw new Error(error.message)
    }
  }

  async remove(id: string) {
    try {

      const task = await this.taskModel.findByIdAndDelete(id);

      if (!task) {
        throw new NotFoundException("Task not found")
      };

      return task
    } catch (error) {

      if (error.message === "Task not found") {
        throw error
      }
      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid Id")
      }

      throw new Error(error.message)
    }
  }
}
