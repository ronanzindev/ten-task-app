import { Task } from "@/types/task";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { TaskItem } from "./TaskItem";
const baseTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Test description",
    isCompleted: false,
    createdAt: new Date("2025-09-20T10:00:00Z"),
    dueDate: new Date("2025-09-22T10:00:00Z"),
}

describe("TaskItem", () => {
    it("renders title and description", () => {
        render(
            <TaskItem
                task={baseTask}
                onToggle={jest.fn()}
                onDelete={jest.fn()}
                onTaskClick={jest.fn()}
            />
        )

        expect(screen.getByText("Test Task")).toBeInTheDocument()
        expect(screen.getByText("Test description")).toBeInTheDocument()
    })


    it("applies line-through when completed", () => {
        const task = { ...baseTask, isCompleted: true }
        render(
            <TaskItem task={task} onToggle={jest.fn()} onDelete={jest.fn()} onTaskClick={jest.fn()} />
        )
        expect(screen.getByText("Test Task")).toHaveClass("line-through")
    })

    it("shows overdue badge when past due", () => {
        const task = { ...baseTask, dueDate: new Date("2020-01-01") }
        render(
            <TaskItem task={task} onToggle={jest.fn()} onDelete={jest.fn()} onTaskClick={jest.fn()} />
        )
        expect(screen.getByText(/Overdue/i)).toBeInTheDocument()
    })
    it("shows due soon badge when within 24h", () => {
        const task = {
            ...baseTask,
            dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
        }
        render(
            <TaskItem task={task} onToggle={jest.fn()} onDelete={jest.fn()} onTaskClick={jest.fn()} />
        )
        expect(screen.getByText(/Due Soon/i)).toBeInTheDocument()
    })
    it("calls onToggle when checkbox clicked", () => {
        const onToggle = jest.fn()
        render(
            <TaskItem task={baseTask} onToggle={onToggle} onDelete={jest.fn()} onTaskClick={jest.fn()} />
        )
        fireEvent.click(screen.getByRole("checkbox"))
        expect(onToggle).toHaveBeenCalledWith("1")
    })

    it("calls onDelete when delete button clicked", () => {
        const onDelete = jest.fn()
        render(
            <TaskItem task={baseTask} onToggle={jest.fn()} onDelete={onDelete} onTaskClick={jest.fn()} />
        )
        fireEvent.click(screen.getByRole("button", { name: /delete task/i }))
        expect(onDelete).toHaveBeenCalledWith("1")
    })
    it("calls onTaskClick when item clicked", () => {
        const onTaskClick = jest.fn()
        render(
            <TaskItem
                task={baseTask}
                onToggle={jest.fn()}
                onDelete={jest.fn()}
                onTaskClick={onTaskClick}
            />
        )
        fireEvent.click(screen.getByText("Test Task"))
        expect(onTaskClick).toHaveBeenCalledWith(baseTask)
    })
})