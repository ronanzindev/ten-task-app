import { CreateTaskDto } from "../dtos/create-task.dto";
import { TaskResponseDto } from "../dtos/task-response.dto";

export interface ITaskService {
    create(createDto: CreateTaskDto): TaskResponseDto
    findAll(): TaskResponseDto[]
    findAllByTitle(title: string): TaskResponseDto[]
}