import { ApiProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"

export class TaskResponseDto {
    @ApiProperty({ description: "Task id", example: randomUUID() })
    id: string

    @ApiProperty({
        description: "Task Title",
        example: "Make some cookies today"
    })
    title: string

    @ApiProperty({
        description: "Task Description",
        example: "Chocolate Cokie"
    })
    description?: string

    @ApiProperty({
        description: "Task due date",
        example: "12/12/2025"
    })
    dueDate?: Date

    @ApiProperty({ description: "Is task completed?", example: true })
    isCompleted: boolean

    constructor(title: string, isCompleted: boolean, description?: string, dueDate?: Date){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.isCompleted = isCompleted
    }
}