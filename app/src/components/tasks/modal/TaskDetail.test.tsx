import { render, screen } from "@testing-library/react"
import { TaskDetailModal } from "./TaskDetail"
import { Task } from "@/types/task"

const baseTask: Task = {
  id: "1",
  title: "Finish project",
  description: "Do all remaining tasks",
  isCompleted: false,
  createdAt: new Date(),
  dueDate: new Date(),
}

describe("TaskDetailModal", () => {
  it("renders task title and description", () => {
    render(<TaskDetailModal task={baseTask} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Finish project")).toBeInTheDocument()
    expect(screen.getByText("Do all remaining tasks")).toBeInTheDocument()
  })

  it("shows task as completed", () => {
    render(
      <TaskDetailModal
        task={{ ...baseTask, isCompleted: true }}
        isOpen={true}
        onClose={() => {}}
      />
    )

    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("Finish project")).toHaveClass("line-through")
  })

  it("shows task as pending", () => {
    render(<TaskDetailModal task={baseTask} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Pending")).toBeInTheDocument()
  })

  it("shows overdue badge when task is late", () => {
    const overdueTask = {
      ...baseTask,
      dueDate: new Date(Date.now() - 1000 * 60 * 60),
    }

    render(<TaskDetailModal task={overdueTask} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Overdue")).toBeInTheDocument()
  })

  it("shows due soon badge when task is within 24h", () => {
    const dueSoonTask = {
      ...baseTask,
      dueDate: new Date(Date.now() + 1000 * 60 * 60),
    }

    render(<TaskDetailModal task={dueSoonTask} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Due Soon")).toBeInTheDocument()
  })

  it("calls onClose when modal is closed", () => {
    const onClose = jest.fn()

    render(<TaskDetailModal task={baseTask} isOpen={true} onClose={onClose} />)

    const closeButton = screen.getByRole("button", { name: /close/i })
    closeButton.click()

    expect(onClose).toHaveBeenCalled()
  })
})
