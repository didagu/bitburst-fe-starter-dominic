<template>
  <div class="backlog-list">
    <ul>
      <li v-for="item in itemsStore.backlog" :key="item.id">
        <div class="todo-list-item">
          <TodoItem :todo="item" type="backlog"/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import { useItemsStore } from '@/store/items';

const itemsStore = useItemsStore();

</script>
<style scoped>
.todo-list-item {
  @apply p-8;
}
.backlog-list {
  @apply pt-8
}
</style>
