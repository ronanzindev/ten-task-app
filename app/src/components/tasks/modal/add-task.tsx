"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateTask } from "@/types/task"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onAddTask: (title: string, description?: string, dueDate?: Date) => void
}
export function AddTaskModal({ isOpen, onAddTask, onClose }: AddTaskModalProps) {
    const handleClose = () => { }
    const { handleSubmit, register, watch } = useForm<CreateTask>()
    const onSubimit = (data) => console.log(data)
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>Increase your productive creating new tasks</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubimit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="task-title">Title</Label>
                        <Input
                            id="task-title"
                            type="text"
                            placeholder="Enter task title"
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                            {...register('title', { required: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="task-description">Description (optional)</Label>
                        <Textarea
                            id="task-description"
                            placeholder="Enter task description"
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                            rows={3}
                            {...register('description')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="task-dueDate">Due Date</Label>
                        <Input
                            id="task-dueDate"
                            type="date"
                            className="bg-input border-border text-foreground"
                            {...register('dueDate')}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant={"outline"} className="flex-1 bg-red-400">Cancel</Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={!watch('title').trim()}
                        >
                            <Plus className="w-4 h-4 mr-2"/>
                            Add Task
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}