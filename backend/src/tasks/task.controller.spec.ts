import { NotFoundException } from "@nestjs/common"
import { CreateTaskDto } from "./dtos/create-task.dto"
import { Task } from "./entities/task.entity"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"

describe("TaskController", () => {
    let taskController: TaskController
    let taskService: TaskService

    beforeEach(() => {
        taskService = new TaskService()
        taskController = new TaskController(taskService)
    })

    describe("create task", () => {
        it("should create and return a task", () => {
            const dto = { title: "New 2025 Task", description: "2025 task goals", dueDate: new Date() }
            const createTask = new Task(dto.title, dto.description, dto.dueDate)
            jest.spyOn(taskService, 'create').mockReturnValue(createTask)
            expect(taskController.create(dto)).toBe(createTask)
            expect(taskService.create).toHaveBeenCalledWith(dto)
        })
    })
    describe("findAll", () => {
        it('should return an array of tasks', () => {
            const result: Task[] = [
                new Task("Task Title", "Task Description")
            ]
            jest.spyOn(taskService, 'findAll').mockImplementation(() => result)
            expect(taskController.findAll()).toBe(result)
        })
        it('should return filtered tasks by title', () => {
            const tasks: Task[] = [
                new Task('Buy milk'),
                new Task('Clean room'),
                new Task('Buy chocolate'),
            ];

            jest.spyOn(taskService, 'findAllByTitle').mockImplementation((title: string) =>
                tasks.filter((task) =>
                    task.title.toLowerCase().includes(title.toLowerCase()),
                ),
            );

            const result = taskController.findAll('buy');
            expect(result).toHaveLength(2);
            expect(result[0].title).toContain('Buy');
            expect(result[1].title).toContain('Buy');
        });
    })
    describe("markAsCompleted", () => {
        it("should mark task as completed", () => {
            const task = new Task("Task Title", "Task Description")
            const id = task.id

            jest.spyOn(taskService, 'markAsCompleted').mockReturnValue({
                ...task,
                isCompleted: true,
            } as Task)
            const result = taskController.markAsCompleted(id)
            expect(result?.isCompleted).toBe(true)
            expect(taskService.markAsCompleted).toHaveBeenCalledWith(id)

        })
        it("should throw NotFoundException if task not found", () => {
            jest.spyOn(taskService, 'markAsCompleted').mockImplementation(() => {
                throw new NotFoundException('Task not found')
            })
            expect(() => taskController.markAsCompleted('wrong id')).toThrow(NotFoundException)
        })
    })
})