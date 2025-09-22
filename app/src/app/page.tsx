"use client"
import { TaskApi } from "@/api/task";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";
import { ProgressCard } from "@/components/ProgressCard";
import { AddTaskModal } from "@/components/tasks/modal/AddTask";
import { TaskDetailModal } from "@/components/tasks/modal/TaskDetail";
import { TaskList } from "@/components/tasks/task-list";
import { TasksCard } from "@/components/TasksCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { Plus, Search } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

export default function Home() {
  const { tasks, error, isLoading, markCompleted, remove } = useTasks()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  if (error) {
    return <Error/>
  }

  if (isLoading) {
    return <Loading/>
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }
  const completedCount = tasks.filter((task) => task.isCompleted).length
  const totalCount = tasks.length
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Task Manager</h1>
            <p className="text-muted-foreground text-lg">Stay organized and productive with your personal task list</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ProgressCard completed={completedCount} total={tasks.length} />
          <TasksCard onDeleteTask={remove} onTaskClick={setSelectedTask} onToggleTask={markCompleted} tasks={tasks} />
        </div>
      </div>
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <TaskDetailModal task={selectedTask} isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
