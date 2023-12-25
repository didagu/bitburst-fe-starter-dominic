<template>
  <div class="mainContainer">
    <div class="tabs">
      <table>
        <tbody class="flex">
        <tr class="flex gap-12">
          <td class="tab" :class="{ 'active': $route.path === '/' }" data-cy="go-to-todolist">
            <router-link to="/">To Do List</router-link>
          </td>
          <td class="tab" :class="{ 'active': $route.path === '/backlog' }" data-cy="go-to-backlog">
            <router-link to="/backlog">Backlog</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="routerView flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
    <div class="input-field">
      <input-field />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputField from '@/components/InputField.vue';
</script>
<style scoped>
.mainContainer {
  @apply flex flex-col h-full w-full sm:w-1/2 my-0 mx-auto pb-48;

  .tabs {
    @apply sticky flex-none border-y-chrome border-b top-0 z-50 bg-white pt-30;

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

  .input-field {
    @apply sticky flex-none bottom-0 z-50 bg-white;
  }

  .routerView {
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease-out;
    }
  }
}
</style>
