<template>
  <div class="complete-task">
    <el-collapse class="complete-task__accordion" accordion>
      <el-collapse-item name="1">
        <template #title>
          <h4 class="complete-task__title">Completed tasks</h4>
        </template>
        <div v-for="task in data" :key="task.id">
          <Task
            v-if="task.completed"
            :title="task.title"
            :description="task.description"
            :completed="task.completed"
            :priority="task.priority"
            @complete-task="store.completeTask(task.id)"
            @delete-task="store.deleteTask(task.id)"
            @edit-task="store.editTask(task)"
          />
          <el-empty v-else :image-size="100" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss">
.complete-task {
  &__title {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>

<script setup lang="ts">
import { TaskModel, Task } from "@/entities";
import { useModalStore } from "@/pages";

const store = useModalStore();
let data = store.getTasks();
</script>
