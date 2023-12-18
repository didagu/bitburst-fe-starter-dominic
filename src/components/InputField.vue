<template>
  <div class="flex">
    <BbInput class="grow" :input-value="inputValue" @update:model-value="updateInputValue"/>
    <BbButton class="grow-0" :disabled="isButtonDisabled" @click="addItem">Add item</BbButton>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useItemsStore } from '@/store/items';
import { useRoute } from "vue-router";
import BbButton from '@/components/BbButton.vue';
import BbInput from '@/components/BbInput.vue';

const itemsStore = useItemsStore();
const route = useRoute();

const currentRoute = ref('')
let inputValue = ref('');

watchEffect(() => {
  currentRoute.value = route.path || ''
})

const isButtonDisabled = computed(() => inputValue.value.trim() === '');

const updateInputValue = (val: string) => {
  inputValue.value = val
}
const addItem = () => {
  const toWhere = currentRoute.value === '/' ? 'list' : 'backlog'
  itemsStore.addItem(inputValue.value, toWhere)
  inputValue.value =  '';
}
</script>
