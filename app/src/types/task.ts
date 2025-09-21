export type Task = {
    id: string
    title: string
    description?: string
    dueDate?: Date | undefined
    isCompleted: boolean
    createdAt: Date
}

export type CreateTask = {
    title: string
    description?: string
    dueDate?: Date
}