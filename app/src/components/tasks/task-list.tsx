"use client"

import { TaskItem } from "@/components/tasks/TaskItem"
import { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  onTaskClick: (task: Task) => void
}

function TaskSection({
  title,
  tasks,
  onToggleTask,
  onDeleteTask,
  onTaskClick,
}: {
  title: string
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  onTaskClick: (task: Task) => void
}) {
  if (tasks.length === 0) return null

  return (
    <section>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </section>
  )
}

export function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onTaskClick,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">
          No tasks yet
        </div>
        <div className="text-muted-foreground text-sm mb-4">
          Add your first task to get started with your productivity journey
        </div>
      </div>
    )
  }

  const pendingTasks = tasks.filter((t) => !t.isCompleted)
  const completedTasks = tasks.filter((t) => t.isCompleted)

  return (
    <div className="space-y-8">
      <TaskSection
        title="Pending"
        tasks={pendingTasks}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onTaskClick={onTaskClick}
      />

      {pendingTasks.length > 0 && completedTasks.length > 0 && (
        <div className="border-t border-muted/30" />
      )}

      <TaskSection
        title="Completed"
        tasks={completedTasks}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onTaskClick={onTaskClick}
      />
    </div>
  )
}
