<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from "@/components/common/Loading.vue";
import { onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <Toast class="w-20rem" position="bottom-left" />

  <div class="flex flex-column gap-3">
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>

  <Loading />
</template>

<style scoped></style>
