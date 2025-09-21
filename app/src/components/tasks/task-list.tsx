import { Task } from "@/types/task"
import { TaskItem } from "./task-item"

interface TaskListProps {
    tasks: Task[]
    onTaskClick: (task: Task) => void
    onToggleTask: (id: string) => void
    onDeleteTask: (id: string) => void
}
export function TasksList({ tasks, onTaskClick, onToggleTask, onDeleteTask }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-2">No task yet</div>
                <div className="text-muted-foreground text-sm">Add your first task to get started with your productive journey</div>
            </div>
        )
    }

    const pendingTasks = tasks.filter((tasks) => !tasks.isCompleted)
    const completedTasks = tasks.filter((tasks) => tasks.isCompleted)
    return (
        <div>
            {pendingTasks.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                        Pending ({pendingTasks.length})
                    </h3>
                    <div className="space-y-2">
                        {pendingTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onTaskClick={onTaskClick}
                                onToggle={onToggleTask}
                                onDelete={onDeleteTask}
                            />
                        ))}

                        {completedTasks.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                                    Completed ({completedTasks.length})
                                </h3>
                                <div className="space-y-2">
                                    {completedTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onToggle={onToggleTask}
                                            onDelete={onDeleteTask}
                                            onTaskClick={onTaskClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}