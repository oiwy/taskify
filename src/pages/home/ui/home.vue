<template>
  <el-container class="home">
    <div class="home__add">
      <el-button type="primary" @click="store.addTask()" plain>
        Add task
      </el-button>
    </div>
    <el-col v-for="task in tasks" :key="task.id">
      <Task
        :title="task.title"
        :description="task.description"
        :completed="task.completed"
        :priority="task.priority"
        @delete-task="store.deleteTask(task.id)"
        @edit-task="store.editTask(task)"
      />
    </el-col>
    <!-- <el-empty v-else :image-size="200" /> -->
  </el-container>
  <ModalTask />
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
import { Task, TaskModel } from "@/entities";
import { useModalStore } from "@/pages";
import { ModalTask } from "@/widgets";

const store = useModalStore();
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as TaskModel[];
</script>
