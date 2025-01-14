import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.taskModel.create(createTaskDto);
      return newTask

    } catch (error) {

      if (error.message.includes("E11000")) {
        throw new BadRequestException("Task already exists")
      }
      throw new Error(error.message)
    }


  }

  findAll() {
    return this.taskModel.find();
  }

  async findOne(id: string) {
    try {

      const task = await this.taskModel.findById(id)

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
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      
      const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {returnOriginal: false});

      if (!task) { 
        throw new NotFoundException("Task not found")
      }

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
