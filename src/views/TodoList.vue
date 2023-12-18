<template>
  <div class="todo-list">
    <div class="todo-list-done-items">
      <div class="completedItemsSummary" data-cy="todolist-completed-items-summary">
        <div class="caret" :class="{ 'caret-down': showItemsCompleted, 'caret-right': !showItemsCompleted }" @click="toggleItemsCompleted"></div>
        {{ itemsStore.completedItems.length }} Done
      </div>
      <transition name="fade" mode="out-in">
        <div v-show="showItemsCompleted">
          <div class="completedItems" v-for="item in itemsStore.completedItems" :key="item.id">
            <TodoItem :todo="item" type="completed"/>
          </div>
        </div>
      </transition>
    </div>
    <hr class="border-chrome">
    <transition-group name="list" tag="ul">
      <li v-for="item in itemsStore.items" :key="item.id">
        <TodoItem class="todo-list-item" :todo="item" type="uncompleted" data-cy="todolist-item"/>
      </li>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import { useItemsStore } from '@/store/items';
import { ref } from "vue";

const itemsStore = useItemsStore();

const showItemsCompleted = ref(false);

const toggleItemsCompleted = () => {
  showItemsCompleted.value = !showItemsCompleted.value
}
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

.caret {
  @apply flex relative w-30 h-30 items-center justify-center bg-blue text-gray-light rounded-full cursor-pointer;
}

.caret-down, .caret-right {
  @apply text-white text-[24px];
}
.caret-down::before {
  @apply content-['\2304'] translate-y-[-4px];
}

.caret-right::before {
  @apply content-['\203A'] translate-y-[-2px];
}

.todo-list-done-items {
  @apply flex flex-col p-8 gap-8;
}

.completedItemsSummary {
  @apply flex gap-8 items-center text-gray-light;
}

.completedItems {
  @apply pointer-events-none
}
</style>
