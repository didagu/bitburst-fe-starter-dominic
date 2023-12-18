<template>
  <div class="todo-list">
    <ul>
      <li v-for="item in itemsStore.items" :key="item.id">
        <TodoItem class="todo-list-item" :todo="item" type="uncompleted"/>
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

</style>
