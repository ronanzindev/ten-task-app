import { CreateTaskDto } from "../dtos/create-task.dto";
import { TaskResponseDto } from "../dtos/task-response.dto";
import { Task } from "../entities/task.entity";

export interface ITaskService {
    create(createDto: CreateTaskDto): TaskResponseDto
    findAll(): TaskResponseDto[]
    findAllByTitle(title: string): TaskResponseDto[]
    findById(id: string): Task | undefined
    markAsCompleted(id: string): TaskResponseDto | undefined
    delete(id: string): void
}