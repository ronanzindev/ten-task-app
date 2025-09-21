import { ITaskService } from "./interfaces/task.interface";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskResponseDto } from "./dtos/task-response.dto";
import { Task } from "./entities/task.entity";
import { HttpException, HttpStatus, Logger, NotFoundException } from "@nestjs/common";

export class TaskService implements ITaskService {
    private tasks: Task[] = []
    private readonly logger = new Logger(TaskService.name)
    create(createDto: CreateTaskDto): TaskResponseDto {
        try {
            const task = new Task(createDto.title, createDto.description, createDto.dueDate)
            this.tasks.push(task)
            this.logger.log(`New task created: ${task.id}->${task.title}`)
            return new TaskResponseDto(task)
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    findAll(): TaskResponseDto[] {
        return this.tasks.map((task) => new TaskResponseDto(task))
    }
    findAllByTitle(title: string): TaskResponseDto[] {
        return this.tasks.filter(task => task.title.toLowerCase().search(title.toLowerCase())).map((task) => new TaskResponseDto(task))
    }
    findById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id)
    }
    markAsCompleted(id: string): TaskResponseDto | undefined {
        const task = this.findById(id)
        if (!task) throw new NotFoundException(`Task with id: '${id}' not found`)
        task.markAsCompleted()
        this.logger.log(`Task ${id} mark as completed`)
        return new TaskResponseDto(task)
    }
}