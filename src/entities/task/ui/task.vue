<template>
  <el-card class="card" shadow="hover">
    <div class="card__header">
      <div class="card__task">
        <el-checkbox
          @click="emit('completeTask')"
          v-model="props.completed"
          size="large"
        />
        <h3 class="card__title">{{ props.title }}</h3>
      </div>
      <el-row class="card__actions">
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="emit('deleteTask')"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle />
          </template>
        </el-popconfirm>
        <el-button
          @click="emit('editTask')"
          type="primary"
          :icon="Edit"
          circle
        />
      </el-row>
    </div>
    <p class="card__description">{{ props.description }}</p>
    <el-tag class="card__priority" :type="typePriority(props.priority)">
      {{ props.priority }}
    </el-tag>
  </el-card>
</template>

<style lang="scss" scoped>
.card {
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
    width: fit-content;
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
  completeTask: [];
  deleteTask: [];
  editTask: [];
}>();

const typePriority = (priority: Priority | undefined) => {
  switch (priority) {
    case "Low": {
      return "success";
    }
    case "Medium": {
      return "warning";
    }
    case "High": {
      return "danger";
    }
  }
};
</script>
