<template>
  <div class="todo">
    <div class="todo-icon grow-0" @click="toggleItemCompletionInStore">
      <div v-if="todo.completed">
        <div class="checkmark-circle">
        </div>
      </div>
      <div v-else>
        <div class="empty-circle"></div>
      </div>
    </div>
    <div class="todo-text grow" :class="{ 'completed': todo.completed }">
      <div class="title">
        {{ todo.title }}
      </div>
      <div class="createdAt">
        {{ todo.createdAt }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Item } from "@/store/ItemTypes.ts";
import { useItemsStore } from "@/store/items.ts";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  todo: Item;
  type: "completed" | "backlog" | "uncompleted";
}>()

const currentRoute = ref('')
const route = useRoute();

watchEffect(() => {
  currentRoute.value = route.path || ''
})

const itemsStore = useItemsStore()

const toggleItemCompletionInStore = () => {
  const targetArray = currentRoute.value === '/' ? 'list' : 'backlog'
  itemsStore.toggleItemCompletion(props.todo, targetArray)
}
</script>
<style scoped>
.todo {
  @apply flex gap-8 justify-center items-center;
}
.checkmark-circle {
  @apply flex items-center justify-center relative w-[30px] h-[30px] bg-blue rounded-full cursor-pointer;
}

.checkmark-circle::before {
  @apply content-['\2713'] text-[24px] text-white;
}

.empty-circle {
  @apply flex relative w-30 h-30 items-center justify-center border-[1px] border-chrome rounded-full bg-white;
}

.todo-text.completed {
  .title {
    @apply line-through;
  }
  @apply text-gray-light;
}

.title {
  @apply text-15;
}

.createdAt {
  @apply text-10;
}
</style>
