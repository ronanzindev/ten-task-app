import { randomUUID } from "crypto"

export class Task {
    id: string
    title: string
    description?: string
    dueDate?: Date
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
    constructor(title: string, description?: string, dueDate?: Date) {
        this.id = randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.isCompleted = false
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
    markAsCompleted() {
        this.isCompleted = true
        this.updatedAt = new Date()
    }
}