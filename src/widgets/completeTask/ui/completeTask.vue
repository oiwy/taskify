<template>
  <div class="complete-task">
    <el-collapse class="complete-task__accordion" accordion>
      <el-collapse-item name="1">
        <template #title>
          <h4 class="complete-task__title">Completed tasks</h4>
        </template>
        <div
          v-for="task in completedTasks"
          v-if="completedTasks.length > 0"
          :key="task.id"
          class="complete-task__list"
        >
          <Task
            :title="task.title"
            :description="task.description"
            :completed="task.completed"
            :priority="task.priority"
            @complete-task="store.completeTask(task.id)"
            @delete-task="store.deleteTask(task.id)"
            @edit-task="store.editTask(task)"
          />
        </div>
        <el-empty v-else :image-size="200" />
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Task, TaskModel } from "@/entities";
import { useModalStore } from "@/pages";

const store = useModalStore();
let tasks = ref<TaskModel[]>(store.getTasks());

const completedTasks = computed(() => {
  return tasks.value.filter((task: { completed: boolean }) => task.completed);
});
</script>
