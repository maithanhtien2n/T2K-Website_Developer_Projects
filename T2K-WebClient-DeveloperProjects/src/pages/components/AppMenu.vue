<script setup>
import { reactive } from "vue";
import DATA from "@/pages/data";
import { useRouter } from "vue-router";

const emits = defineEmits(["onEmitCloseSidebar"]);

const { appMenu } = DATA;

const ROUTER = useRouter();

const onClickMenuLabel = (routeName) => {
  emits("onEmitCloseSidebar");
  ROUTER.push({ name: routeName });
};
</script>

<template>
  <div class="flex flex-column">
    <span
      class="menu-item on-click p-3"
      v-for="(menuItem, index) in appMenu"
      :key="index"
      @click="onClickMenuLabel(menuItem.routeName)"
    >
      {{ menuItem.label }}
    </span>
  </div>
</template>

<style scoped>
.menu-item {
  transition: all 0.1s ease;
  border-radius: 0.7rem;
}
.menu-item:hover {
  background: #e9ecef;
}
</style>
