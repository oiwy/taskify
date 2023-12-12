<template>
  <el-container class="home">
    <div class="home__add">
      <el-input v-model="input" placeholder="Task" />
      <el-button type="primary" @click="addTask(input)" plain>
        Add task
      </el-button>
    </div>
    <el-col v-if="data.length > 0" v-for="task in data" :key="task.id">
      <Task
        :title="task.title"
        :description="task.description"
        :completed="task.completed"
        :priority="task.priority"
        :data="task"
        @delete-task="deleteTask(task.id)"
        @edit-task="editTask(task)"
      />
    </el-col>
    <el-empty v-else :image-size="200" />
  </el-container>
</template>

<style lang="scss" scoped>
.home {
  flex-direction: column;
  gap: 10px;

  &__add {
    display: flex;
    gap: 5px;
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Task, TaskModel } from "@/entities";

const input = ref<string>("");

const addTask = (input: string) => {
  data.value.push({
    id: data.value.length + 1,
    title: input,
    description: "Description",
    completed: false,
    priority: "Low",
  });
};

const deleteTask = (taskId: number) => {
  console.log(taskId);
};

const editTask = (taskData: TaskModel) => {
  const openEdit = (task: TaskModel) => {
    return task.title;
  };

  const task = data.value.find((task) => task.id === taskData.id);

  if (task) {
    task.title = openEdit(task);
  } else {
    console.error(`Task with id ${taskData.id} not found.`);
  }

  console.log(task);
};

const data = ref<TaskModel[]>([
  {
    id: 1,
    title: "Task 1",
    description: "Description",
    completed: false,
    priority: "Low",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description",
    completed: false,
    priority: "Low",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description",
    completed: false,
    priority: "High",
  },
]);
</script>
