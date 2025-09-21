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
            const dto = {title: "New 2025 Task", description: "2025 task goals", dueDate: new Date()}
            const createTask = new Task(dto.title, dto.description, dto.dueDate)
            jest.spyOn(taskService, 'create').mockReturnValue(createTask)
            expect(taskController.create(dto)).toBe(createTask)
            expect(taskService.create).toHaveBeenCalledWith(dto)
        })
    })
})