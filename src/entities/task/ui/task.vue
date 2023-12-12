<template>
  <div class="card">
    <div class="card__header">
      <div class="card__task">
        <el-checkbox v-model="props.completed" size="large" />
        <h3 class="card__title">{{ props.title }}</h3>
      </div>
      <div class="card__actions">
        <el-button
          @click="emit('deleteTask')"
          type="danger"
          :icon="Delete"
          circle
        />
        <el-button
          @click="emit('editTask')"
          type="primary"
          :icon="Edit"
          circle
        />
      </div>
    </div>
    <p class="card__description">{{ props.description }}</p>
    <span class="card__priority" :style="colorPriority(props.priority)">{{
      props.priority
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__task {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 100%;
    color: var(--el-text-color-primary);
  }

  &__actions {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  &__description {
    font-size: 16px;
    font-weight: 400;
    line-height: 100%;
    color: var(--el-text-color-primary);
  }

  &__priority {
    font-size: 12px;
    font-weight: 600;
    line-height: 100%;
  }
}
</style>

<script setup lang="ts">
import { Priority } from "@/entities";
import { Delete, Edit } from "@element-plus/icons-vue";

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  completed: Boolean,
  priority: String as () => Priority,
});

const emit = defineEmits<{
  deleteTask: [];
  editTask: [];
}>();

const colorPriority = (priority: Priority | undefined) => {
  switch (priority) {
    case "Low": {
      return "color: var(--el-color-success);";
    }
    case "Medium": {
      return "color: var(--el-color-warning);";
    }
    case "High": {
      return "color: var(--el-color-danger);";
    }
  }
};
</script>
