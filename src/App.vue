<template>
  <div class="mainContainer">
    <div class="tabs">
      <table>
        <tbody class="flex">
        <tr class="flex gap-12">
          <td class="tab" :class="{ 'active': $route.path === '/' }">
            <router-link to="/">To Do List</router-link>
          </td>
          <td class="tab" :class="{ 'active': $route.path === '/backlog' }">
            <router-link to="/backlog">Backlog</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="routerView flex-grow overflow-y-auto">
      <router-view/>
    </div>
    <div class="flex-none h-1/8">
      <input-field />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputField from '@/components/InputField.vue';
</script>
<style scoped>
.mainContainer {
  @apply flex flex-col h-screen w-full sm:w-1/2 my-0 mx-auto pt-30 pb-48;

  .tabs {
    @apply flex-none h-[1/8] border-y-chrome border-b;

    .tab {
      @apply relative flex justify-center items-center w-auto h-30 pb-20 text-gray text-[28px] font-bold leading-loose;

      &.active {
        @apply text-black;
        &::before{
          @apply absolute h-4 rounded bottom-0 left-0 right-0 bg-blue content-[''];
        }
      }
    }
  }
}
</style>
