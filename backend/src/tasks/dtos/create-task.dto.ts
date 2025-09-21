import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
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
        example: "2025-12-12"
    })
    @ApiPropertyOptional()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dueDate?: Date
}