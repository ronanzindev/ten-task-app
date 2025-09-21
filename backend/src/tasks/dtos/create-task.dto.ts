import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class CreateTaskDto {
    @ApiProperty({
        description: "Task Title",
        example: "Make some cookies today"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: "Task Description",
        example: "Chocolate Cokie"
    })
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: "Task due date",
        example: "12/12/2025"
    })
    @ApiPropertyOptional()
    @IsDate()
    @IsOptional()
    dueDate?: Date
}