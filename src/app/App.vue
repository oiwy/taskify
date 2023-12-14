<template>
  <Header></Header>
  <el-main>
    <RouterView></RouterView>
  </el-main>
</template>

<script setup lang="ts">
import { Header } from "@/widgets";
import { RouterView } from "vue-router";
</script>
