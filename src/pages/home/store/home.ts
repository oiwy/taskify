import { defineStore } from "pinia";
import { TaskModel } from "@/entities";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isOpen: false,
    temp: {} as TaskModel,
    task: {} as TaskModel,
  }),
  actions: {
    closeModal() {
      this.isOpen = false;
    },
    addTask() {
      this.isOpen = true;
    },
    editTask(task: TaskModel) {
      this.temp = task;

      this.isOpen = true;
    },
    saveData(task: TaskModel) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];
      let newTask = {} as TaskModel;

      if (task.id) {
        const index = tasks.findIndex((t: TaskModel) => t.id === task.id);

        if (index !== -1) {
          tasks[index].title = task.title;
          tasks[index].description = task.description;
          tasks[index].completed = task.completed;
          tasks[index].priority = task.priority;
        }
      } else {
        newTask = {
          id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
          title: task.title,
          description: task.description,
          completed: false,
          priority: task.priority,
        };

        tasks.push(newTask);
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      window.location.reload();
      this.isOpen = false;
    },
    deleteTask(id: number) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];

      tasks = tasks.filter((t: TaskModel) => t.id !== id);

      localStorage.setItem("tasks", JSON.stringify(tasks));
      window.location.reload();
    },
  },
});
