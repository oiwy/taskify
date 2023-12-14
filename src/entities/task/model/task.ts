export type Priority = "Low" | "Medium" | "High";

export type TaskModel = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
};
