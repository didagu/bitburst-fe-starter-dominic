<template>
  <div class="backlog-list">
    <transition-group name="list" tag="ul">
      <li v-for="item in itemsStore.backlog" :key="item.id">
        <div class="todo-list-item">
          <TodoItem :todo="item" type="backlog"/>
        </div>
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
.backlog-list {
  @apply pt-8
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
