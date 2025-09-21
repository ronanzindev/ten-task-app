import useSWR, { mutate } from "swr";
import { Task } from "@/types/task";
import { TaskApi } from "@/api/task";

export function useTasks() {
  const { data: tasks = [], error, isLoading } = useSWR<Task[]>("/tasks", TaskApi.findAll);

  const markCompleted = async (id: string) => {
    await TaskApi.markAsCompleted(id);
    mutate("/tasks");
  };

  const remove = async (id: string) => {
    await TaskApi.delete(id);
    mutate("/tasks");
  };

  return {
    tasks,
    error,
    isLoading,
    markCompleted,
    remove,
  };
}