<template>
  <div class="backlog-list">
    <SortingField :search-value="searchValue" @update:searchValue="updateSearchValue" data-cy="sorting-field"/>
    <transition-group name="list" tag="ul">
      <li v-for="item in filteredItems" :key="item.id">
        <div class="todo-list-item">
          <TodoItem :todo="item" type="backlog" data-cy="backlog-item"/>
        </div>
      </li>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import SortingField from "@/components/SortingField.vue";
import TodoItem from "@/components/TodoItem.vue";
import { ref, computed } from "vue"
import { useItemsStore } from '@/store/items';

const itemsStore = useItemsStore();

const searchValue = ref('');

const updateSearchValue = (newSearchValue: string) => {
  searchValue.value = newSearchValue;
};

const filteredItems = computed(() =>
  itemsStore.backlog.filter(item => {
    const searchText = searchValue.value.toLowerCase().trim()
    return item.title.toLowerCase().includes(searchText) || item.createdAt.toLowerCase().includes(searchText)
  })
)
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
