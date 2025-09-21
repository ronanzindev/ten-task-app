import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Injectable, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskResponseDto } from "./dtos/task-response.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create a new Task" })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Task created successfully", type: TaskResponseDto })
    create(@Body() createDto: CreateTaskDto): TaskResponseDto {
        return this.taskService.create(createDto)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get all tasks" })
    @ApiQuery({ name: "title", required: false })
    @ApiResponse({ status: HttpStatus.OK, description: "List of tasks", type: [TaskResponseDto] })
    findAll(@Query("title") title?: string): TaskResponseDto[] {
        if (title) return this.taskService.findAllByTitle(title)
        return this.taskService.findAll()
    }

    @Patch("/:id/done")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Mark a task as completed" })
    @ApiResponse({ status: HttpStatus.OK, description: 'Task marked as completed', type: TaskResponseDto })
    @ApiResponse({ status: 404, description: "Task not found" })
    markAsCompleted(@Param('id') id: string) {
        return this.taskService.markAsCompleted(id)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a task by ID" })
    @ApiResponse({ status: 204, description: "Task deleted successfully" })
    @ApiResponse({ status: 404, description: "Task not found" })
    delete(@Param("id") id: string): void {
        this.taskService.delete(id)
    }
}