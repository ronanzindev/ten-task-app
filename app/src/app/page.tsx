"use client"
import { TaskApi } from "@/api/task";
import { AddTaskModal } from "@/components/tasks/modal/add-task";
import { TaskDetailModal } from "@/components/tasks/modal/task-detail";
import { TasksList } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task";
import { Plus, Search } from "lucide-react"
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const { data: tasks, error, isLoading } = useSWR("/tasks", TaskApi.findAll, { fallbackData: [] })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  if (error) {
    return <p>{error.info}</p>
  }
  if (isLoading) {
    return <p>Loading....</p>
  }
  const updateTask = async () => {
    try {

    }catch(err) {

    }
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
          <div className="md:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="text-foreground font-medium"> {completedCount} of {totalCount}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Your tasks
                </CardTitle>
                <CardDescription>
                  {totalCount === 0 ? "No tasks yet. Add your first task to get started!" : `${totalCount} total tasks`}
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tasks by title..."
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <TasksList tasks={tasks} onTaskClick={handleTaskClick} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <TaskDetailModal task={selectedTask} isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}/>
    </div>
  );
}
