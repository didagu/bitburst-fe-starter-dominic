<template>
  <div class="flex h-40">
    <BbInput class="flex-shrink grow sm:w-3/5 w-2/5" :input-value="searchValue" placeholder="Search" @update:model-value="emitSearchValue"/>
    <BbButton class="flex-shrink-0 sm:w-1/5 w-3/10" @click="sortBy('title')">Sort by Name</BbButton>
    <BbButton class="flex-shrink-0 sm:w-1/5 w-3/10" @click="sortBy('createdAt')">Sort by Date</BbButton>
  </div>

</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useItemsStore } from '@/store/items';
import BbButton from '@/components/BbButton.vue';
import BbInput from '@/components/BbInput.vue';

const itemsStore = useItemsStore();
const { sortBy } = toRefs(itemsStore)

const props = defineProps(['searchValue']);
const emit = defineEmits();
const searchValue = ref(props.searchValue);

const emitSearchValue = (val: string) => {
  searchValue.value = val
  emit('update:searchValue', searchValue.value);
};

</script>
