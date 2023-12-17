import { createRouter, createWebHistory } from "vue-router";

import TodoList from "@/views/TodoList.vue";
import BacklogList from "@/views/BacklogList.vue";

const routes = [
  { path: "/", component: TodoList },
  { path: "/backlog", component: BacklogList },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
