<template>
  <div class="actions">
    <div class="dropdown" ref="dropdown" v-if="type === 'uncompleted'">
      <div class="ellipsis" :class="{ 'active': isEllipsisActive }" @click="showDefaultAction">
        <div class="small-circle"></div>
        <div class="small-circle"></div>
        <div class="small-circle"></div>
      </div>
      <ul class="options-list" :class="{ 'show': showDefaultActions }">
        <li @click="deleteItemFromStore">Delete</li>
        <li @click="moveItemFromListToBacklog">Move to backlog</li>
      </ul>
    </div>
    <div v-if="type === 'backlog'">
      <BbButton class="grow-0" small variant="outlined" @click="moveToList">Move to List</BbButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, toRefs } from "vue";
import { useItemsStore } from "@/store/items.ts";
import BbButton from "@/components/BbButton.vue";

interface Props {
  type: "completed" | "backlog" | "uncompleted"
  itemId: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    itemId: ""
  }
);

const { itemId } = toRefs(props)
const showDefaultActions = ref(false)
const dropdown = ref<HTMLDivElement | null>(null)
const isEllipsisActive = ref(false)

const itemsStore = useItemsStore()

const showDefaultAction = () => {
  showDefaultActions.value = !showDefaultActions.value
  isEllipsisActive.value = !isEllipsisActive.value
}
const clickOutsideListener = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    showDefaultActions.value = false;
    isEllipsisActive.value = false;
  }
}
const deleteItemFromStore = () => {
  itemsStore.deleteItem(itemId.value);
  // we definitely do not want the actions dropdown to still be open after the user finished interacting with it
  showDefaultActions.value = false
}
const moveItemFromListToBacklog = () => {
  itemsStore.moveItemToBacklog(itemId.value)
  showDefaultActions.value = false
}
const moveToList = () => {
  itemsStore.moveItemToList(itemId.value)
}

onMounted(() => document.addEventListener('click', clickOutsideListener))
onBeforeUnmount(() => document.removeEventListener('click', clickOutsideListener))

</script>
<style scoped>
.actions {
  @apply flex items-center justify-center;
}

.dropdown {
  position: relative;
}

.ellipsis {
  @apply flex items-center justify-between relative p-5 w-[30px] h-[30px] rounded-full cursor-pointer;
  .small-circle {
    @apply bg-gray-dark rounded-full w-4 h-4;
  }
  &.active {
    @apply bg-chrome;
    .small-circle {
      @apply bg-black;
    }
  }
}

.options-list {
  @apply hidden absolute w-[120px] left-[-130px] z-[1] top-0 bg-white
  text-13 text-blue font-medium rounded border-gray-light border-2;

  li {
    @apply box-border border-b-2 p-4 border-b-gray-light cursor-pointer;

    &:last-child {
      @apply border-b-0;
    }
  }

  &.show {
    @apply block;
  }
}

</style>
