"use client"
import { TaskApi } from "@/api/task"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateTask } from "@/types/task"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { mutate } from "swr"

interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
}
export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
    const { handleSubmit, register, watch, reset, control, formState: { errors } } = useForm<CreateTask>({ defaultValues: { title: "", dueDate: undefined } })
    const onSubmit = async (task: CreateTask) => {
        try {
            await TaskApi.create(task)
            mutate("/tasks")
            toast.success("Task created successfully")
            reset()
            onClose()
        } catch (err) {
            toast.error("Failed to create task. Try it later")
            console.log(err)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>Increase your productive creating new tasks</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="taskTitle">Title</Label>
                        <Input
                            id="taskTitle"
                            type="text"
                            placeholder="Enter task title"
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                            {...register('title', { required: "Title is required" })}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taskDescription">Description (optional)</Label>
                        <Textarea
                            id="taskDescription"
                            placeholder="Enter task description"
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                            rows={3}
                            {...register('description')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taskDueDate">Due Date</Label>
                        <Controller
                            control={control}
                            name="dueDate"
                            defaultValue={undefined}
                            render={({ field }) => (
                                <Input
                                    id="taskDueDate"
                                    type="date"
                                    className="bg-input border-border text-foreground"
                                    {...field}
                                       value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        field.onChange(e.target.value === '' ? undefined : new Date(e.target.value))
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button onClick={onClose} type="button" variant={"destructive"} className="flex-1 bg-red-400">Cancel</Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={!watch('title').trim()}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}