import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AddTaskModal } from "./AddTask"
import { TaskApi } from "@/api/task"
import { mutate } from "swr"
import { toast } from "sonner"

jest.mock("@/api/task", () => ({
  TaskApi: { create: jest.fn() },
}))
jest.mock("sonner", () => ({ toast: { success: jest.fn(), error: jest.fn() } }))
jest.mock("swr", () => ({ mutate: jest.fn() }))

describe("AddTaskModal", () => {
  const onClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("renders modal with input fields", () => {
    render(<AddTaskModal isOpen={true} onClose={onClose} />)

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument()
  })
  it("submits task successfully", async () => {
    ; (TaskApi.create as jest.Mock).mockResolvedValueOnce({})

    render(<AddTaskModal isOpen={true} onClose={onClose} />)

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Test description" },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: "2025-09-22" },
    })

    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }))

    await waitFor(() => {
      expect(TaskApi.create).toHaveBeenCalledWith({
        title: "New Task",
        description: "Test description",
        dueDate: new Date("2025-09-22"),
      })
      expect(mutate).toHaveBeenCalledWith("/tasks")
      expect(toast.success).toHaveBeenCalledWith("Task created successfully")
      expect(onClose).toHaveBeenCalled()
    })
  })

  it("shows error toast when API fails", async () => {
    ; (TaskApi.create as jest.Mock).mockRejectedValueOnce(new Error("API error"))

    render(<AddTaskModal isOpen={true} onClose={onClose} />)

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Bad Task" },
    })
    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to create task. Try it later"
      )
    })
  })
})
