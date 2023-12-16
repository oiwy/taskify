<template>
  <el-container class="home">
    <div class="home__add">
      <el-button type="primary" @click="store.addTask()" plain>
        Add task
      </el-button>
    </div>
    <div v-for="task in tasks" v-if="tasks.length > 0" :key="task.id">
      <Task
        v-if="!task.completed"
        :title="task.title"
        :description="task.description"
        :completed="task.completed"
        :priority="task.priority"
        @complete-task="store.completeTask(task.id)"
        @delete-task="store.deleteTask(task.id)"
        @edit-task="store.editTask(task)"
      />
    </div>
    <el-empty v-else :image-size="200" class="home__empty" />
    <CompleteTask />
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

  &__empty {
    width: 100%;
    height: 65vh;
  }
}
</style>

<script setup lang="ts">
import { Task } from "@/entities";
import { useModalStore } from "@/pages";
import { CompleteTask, ModalTask } from "@/widgets";

const store = useModalStore();
let tasks = store.getTasks();
</script>
