<template>
  <Header></Header>
  <el-main>
    <RouterView></RouterView>
  </el-main>
  <modalTask></modalTask>
</template>

<script setup lang="ts">
import { Header, modalTask } from "@/widgets";
import { RouterView } from "vue-router";
</script>
