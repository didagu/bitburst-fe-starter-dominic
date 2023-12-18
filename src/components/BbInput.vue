<template>
  <input
    :type="type"
    maxlength="70"
    class="text-15 text-black border border-gray-light rounded py-12 px-15 m-8 focus:border-blue"
    :value="inputValue"
    @input="updateInputValue"
  />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    type?: string;
    inputValue: string;
  }>(),
  {
    type: "text",
  }
);

const emit = defineEmits()

const updateInputValue = (event: Event) => {
  emit('update:modelValue', event.target?.value)
}
</script>
