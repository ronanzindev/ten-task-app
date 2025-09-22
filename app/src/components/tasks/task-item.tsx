"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Task } from "@/types/task"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onTaskClick: (task: Task) => void
}

export function TaskItem({ task, onToggle, onDelete, onTaskClick }: TaskItemProps) {
  const createdAt = new Date(task.createdAt)
  const dueDate = task.dueDate ? new Date(task.dueDate) : null
  const isOverdue = dueDate && !task.isCompleted && new Date() > dueDate
  const isDueSoon =
    dueDate &&
    !task.isCompleted &&
    new Date() <= dueDate &&
    dueDate.getTime() - new Date().getTime() <= 24 * 60 * 60 * 1000

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border transition-all duration-200",
        "bg-secondary/50 border-border hover:bg-secondary/80 cursor-pointer",
        task.isCompleted && "opacity-60",
      )}
      onClick={() => onTaskClick(task)}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={(e) => {
            onToggle(task.id)
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p
            className={cn(
              "text-sm font-medium transition-all duration-200",
              task.isCompleted ? "line-through text-muted-foreground" : "text-foreground",
            )}
          >
            {task.title}
          </p>
          <div className="flex gap-1 flex-shrink-0">
            {isOverdue && (
              <Badge variant="destructive" className="text-xs">
                Overdue
              </Badge>
            )}
            {isDueSoon && (
              <Badge variant="outline" className="text-xs text-orange-500 border-orange-500">
                Due Soon
              </Badge>
            )}
          </div>
        </div>

        {task.description && (
          <p
            className={cn(
              "text-xs mt-1 transition-all duration-200",
              task.isCompleted ? "line-through text-muted-foreground/70" : "text-muted-foreground",
            )}
          >
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>
              {createdAt.toLocaleDateString()} at{" "}
              {createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          {dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Due: {dueDate.toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.id)
        }}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
        <span className="sr-only">Delete task</span>
      </Button>
    </div>
  )
}
