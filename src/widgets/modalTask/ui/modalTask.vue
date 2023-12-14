<template>
  <el-dialog
    class="dialog"
    v-model="store.isOpen"
    title="Edit Task"
    align-center
  >
    <el-form class="dialog__form" :model="task" label-position="top">
      <el-form-item class="dialog__form-item" label="Title">
        <el-input v-model="task.title" autocomplete="off" />
      </el-form-item>
      <el-form-item class="dialog__form-item" label="Description">
        <el-input v-model="task.description" autocomplete="off" />
      </el-form-item>
      <el-form-item class="dialog__form-item" label="Description">
        <el-select
          class="dialog__form-item"
          v-model="task.priority"
          placeholder="Priority"
        >
          <el-option label="Low" value="Low" />
          <el-option label="Medium" value="Medium" />
          <el-option label="High" value="High" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog__footer">
        <el-button @click="store.closeModal()">Cancel</el-button>
        <el-button type="primary" @click="store.saveData(task)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.dialog {
  &__form-item {
    width: 100%;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from "vue";
import { TaskModel } from "@/entities";
import { useModalStore } from "@/pages";

const store = useModalStore();
let task = ref<TaskModel>(store.temp);

watch(
  [() => store.temp, () => store.isOpen],
  ([newTask, isOpen], [prevTask, prevIsOpen]) => {
    if (newTask !== prevTask && isOpen !== prevIsOpen) {
      task.value = newTask;
    }
  }
);
</script>
