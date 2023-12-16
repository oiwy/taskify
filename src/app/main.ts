import { createApp } from "vue";
import { ROUTE_PATH } from "@/shared";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: ROUTE_PATH as RouteRecordRaw[],
});
const app = createApp(App);

app.use(router).use(ElementPlus).use(pinia).mount("#app");
