<template>
  <div class="todo-list">
    <transition-group name="list" tag="ul">
      <li v-for="item in itemsStore.items" :key="item.id">
        <TodoItem class="todo-list-item" :todo="item" type="uncompleted"/>
      </li>
    </transition-group>
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

.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all duration-1000 ease-out;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0;
}

.list-leave-active {
  @apply absolute;
}

</style>
