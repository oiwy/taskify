import { defineStore } from "pinia";
import { TaskModel } from "@/entities";
import { ElNotification } from "element-plus";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isOpen: false as boolean,
    titleModal: "" as string,
    temp: {} as TaskModel,
    tasks: [] as TaskModel[],
  }),
  actions: {
    closeModal() {
      this.isOpen = false;
    },
    addTask() {
      this.titleModal = "Add Task";
      this.isOpen = true;
    },
    editTask(task: TaskModel) {
      this.titleModal = "Edit Task";
      this.temp = task;
      this.isOpen = true;
    },
    searchTask() {
      this.titleModal = "Search Task";
      this.isOpen = true;
    },
    saveData(task: TaskModel) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];
      let newTask = {} as TaskModel;
      console.log(task);

      if (task.id) {
        const index = tasks.findIndex((t: TaskModel) => t.id === task.id);

        if (index !== -1) {
          tasks[index].title = task.title;
          tasks[index].description = task.description;
          tasks[index].completed = task.completed;
          tasks[index].priority = task.priority;
        }
      } else if (!task.id) {
        newTask = {
          id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
          title: task.title,
          description: task.description,
          completed: false,
          priority: task.priority || "Medium",
        };

        tasks.push(newTask);
      } else {
        ElNotification({
          title: "Error",
          message: "Incorrect Data",
          type: "error",
        });
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
    completeTask(id: number) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];

      const index = tasks.findIndex((t: TaskModel) => t.id === id);

      if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        ElNotification({
          title: "Error",
          message: "Task not found",
          type: "error",
        });
      }

      window.location.reload();
    },
    getTasks(
      searchQuery: {
        title?: string;
        description?: string;
        priority?: string;
      } = {}
    ) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks: TaskModel[] = tasksJson ? JSON.parse(tasksJson) : [];
      this.tasks = tasks;

      console.log(searchQuery);

      // Если searchQuery пуст, возвращаем все задачи.
      if (Object.keys(searchQuery).length === 0) {
        return tasks;
      }

      // Фильтрация задач на основе searchQuery.
      const filteredTasks = tasks.filter((task: TaskModel) => {
        const matchesTitle = searchQuery.title
          ? task.title.toLowerCase().includes(searchQuery.title.toLowerCase())
          : true;
        const matchesDescription = searchQuery.description
          ? task.description
              .toLowerCase()
              .includes(searchQuery.description.toLowerCase())
          : true;
        const matchesPriority = searchQuery.priority
          ? task.priority === searchQuery.priority
          : true;
        return matchesTitle && matchesDescription && matchesPriority;
      });

      this.tasks = filteredTasks;
      return filteredTasks;
    },
    sortTask(sortBy: string) {
      const tasksJson = localStorage.getItem("tasks");
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];

      tasks = tasks.filter((task: TaskModel) => {
        const { title, description, priority } = task;

        return (
          (sortBy === "title" && title) ||
          (sortBy === "description" && description) ||
          (sortBy === "priority" && priority)
        );
      });

      tasks.sort((a: TaskModel, b: TaskModel) => {
        if (sortBy === "title" && a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "description" && a.description && b.description) {
          return a.description.localeCompare(b.description);
        }
        if (sortBy === "priority" && a.priority && b.priority) {
          return (a.priority = b.priority);
        }
        return 0;
      });

      return tasks;
    },
  },
} as const);
