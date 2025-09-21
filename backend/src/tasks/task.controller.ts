import { Body, Controller, HttpCode, HttpStatus, Injectable, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskResponseDto } from "./dtos/task-response.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    @ApiOperation({summary: "Create a new Task"})
    @ApiBody({type: CreateTaskDto})
    @ApiResponse({status: HttpStatus.CREATED, description: "Task created successfully", type: TaskResponseDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDto: CreateTaskDto): TaskResponseDto {
        return this.taskService.create(createDto)
    }
}