import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskResponseDto } from "./dtos/task-response.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @ApiOperation({ summary: "Create a new Task" })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Task created successfully", type: TaskResponseDto })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDto: CreateTaskDto): TaskResponseDto {
        return this.taskService.create(createDto)
    }

    @Get()
    @ApiOperation({ summary: "Get all tasks" })
    @ApiQuery({ name: "title", required: false })
    @ApiResponse({ status: HttpStatus.OK, description: "List of tasks", type: [TaskResponseDto] })
    @HttpCode(HttpStatus.OK)
    findAll(@Query("title") title?: string): TaskResponseDto[] {
        if (title) return this.taskService.findAllByTitle(title)
        return this.taskService.findAll()
    }

    @Patch("/:id/done")
    @ApiOperation({ summary: "Mark a task as completed" })
    @ApiResponse({ status: HttpStatus.OK, description: 'Task marked as completed', type: TaskResponseDto })
    @HttpCode(HttpStatus.OK)
    markAsCompleted(@Param('id') id: string) {
        return this.taskService.markAsCompleted(id)
    }
}