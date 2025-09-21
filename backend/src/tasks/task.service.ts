import { ITaskService } from "./interfaces/task.interface";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskResponseDto } from "./dtos/task-response.dto";
import { Task } from "./entities/task.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class TaskService implements ITaskService {
    private tasks: Task[] = []
    private readonly logger = new Logger(TaskService.name)
    create(createDto: CreateTaskDto): TaskResponseDto {
        try {
            const task = new Task(createDto.title, createDto.description, createDto.dueDate)
            this.tasks.push(task)
            this.logger.log(`New task created: ${task.id}->${task.title}`)
            return new TaskResponseDto(task.id, task.title, task.isCompleted, task.description, task.dueDate)
        } catch(error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}