import { CreateTask, Task } from "@/types/task";
import { API } from "./API";

const api = new API()
export class TaskApi {
    static create(task: CreateTask) {
        return api.post<Task>("/tasks", task)
    }
}