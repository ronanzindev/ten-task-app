"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TaskList } from "@/components/tasks/task-list";
import { Task } from "@/types/task";
import { useState, useMemo } from "react";

type TasksCardProps = {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
};

export function TasksCard({ tasks, onTaskClick, onDeleteTask, onToggleTask }: TasksCardProps) {
    const [query, setQuery] = useState("");
    console.log(tasks.length)
    const filteredTasks = useMemo(() => {
        return tasks.filter((t) =>
            t.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [tasks, query]);

    return (
        <div className="md:col-span-2">
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="text-card-foreground">Your tasks</CardTitle>
                    <CardDescription>
                        {tasks.length === 0
                            ? "No tasks yet. Add your first task to get started!"
                            : `${tasks.length} total tasks`}
                    </CardDescription>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search tasks by title..."
                            className="pl-10 bg-background border-border"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search tasks"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <TaskList
                        tasks={filteredTasks}
                        onTaskClick={onTaskClick}
                        onDeleteTask={onDeleteTask}
                        onToggleTask={onToggleTask}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
