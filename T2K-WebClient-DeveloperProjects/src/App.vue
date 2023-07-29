<script setup>
import TheHeader from "@/components/TheHeader.vue";
import Loading from "@/components/common/Loading.vue";
</script>

<template>
  <div>
    <TheHeader />

    <router-view />
  </div>

  <Loading />
</template>

<style scoped></style>
