<template>
  <el-header class="header">
    <h2 class="header__title">taskify</h2>
    <el-button :icon="Search" circle />
  </el-header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 100%;
    color: var(--el-text-color-primary);
  }
}
</style>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>
