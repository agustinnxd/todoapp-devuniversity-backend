import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Put, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, createTaskSchema, UpdateTaskDto, updateTaskSchema } from './dto'
import { ZodValidationPipe } from '../pipes/zodValidationPipe';
import { AuthGuard } from 'src/users/users.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  @UseGuards(AuthGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(createTaskDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  @UseGuards(AuthGuard)
  update( @Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
