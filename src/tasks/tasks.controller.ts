import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, createTaskSchema, UpdateTaskDto, updateTaskSchema } from './dto'
import { ZodValidationPipe } from '../pipes/zodValidationPipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  create(@Body() createTaskDto: CreateTaskDto) {
    
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  update( @Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
