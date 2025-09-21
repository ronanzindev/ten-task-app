import { CreateTask, Task } from "@/types/task";
import { API } from "./API";

const api = new API()
export class TaskApi {
    static create(task: CreateTask) {
        return api.post<Task>("/tasks", task)
    }
    static findAll() {
        return api.get<Task[]>("/tasks")
    }

    static markAsCompleted(id: string) {
        const path = `/tasks/${id}/done`
        return api.patch(path)
    }

    static delete(id: string) {
        const path = `/tasks/${id}`
        return api.delete(path)
    }
}