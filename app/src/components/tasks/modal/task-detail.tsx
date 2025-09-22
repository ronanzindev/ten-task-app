"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle, Circle } from "lucide-react"
import { Task } from "@/types/task"

interface TaskDetailModalProps {
    task: Task | null
    isOpen: boolean
    onClose: () => void
}

export function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
    if (!task) return null
    const createdAt = new Date(task.createdAt)
    const dueDate = task.dueDate ? new Date(task.dueDate) : null
    const isOverdue = dueDate && !task.isCompleted && new Date() > dueDate
    const isDueSoon =
        dueDate &&
        !task.isCompleted &&
        new Date() <= dueDate &&
        dueDate.getTime() - new Date().getTime() <= 24 * 60 * 60 * 1000
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {task.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        Task Details
                    </DialogTitle>
                    <DialogDescription>View complete information about this task</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium text-foreground mb-2">Task</h3>
                        <p className={`text-sm ${task.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {task.title}
                        </p>
                    </div>

                    {task.description && (
                        <div>
                            <h3 className="font-medium text-foreground mb-2">Description</h3>
                            <p
                                className={`text-sm ${task.isCompleted ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                            >
                                {task.description}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        <Badge variant={task.isCompleted ? "secondary" : "default"}>{task.isCompleted ? "Completed" : "Pending"}</Badge>

                        {isOverdue && <Badge variant="destructive">Overdue</Badge>}

                        {isDueSoon && (
                            <Badge variant="outline" className="text-orange-500 border-orange-500">
                                Due Soon
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-3 pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>
                                Created: {createdAt.toLocaleDateString()} at{" "}
                                {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>

                        {dueDate && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Due: {dueDate.toLocaleDateString()} at{" "}
                                    {dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
