<script setup>
import { onMounted } from "vue";
import DATA from "@/pages/data";
import { accessToken } from "@/utils";
import { useRoute } from "vue-router";
import { StoreApp } from "@/services/stores";
import TheHeader from "./components/TheHeader.vue";

const ROUTE = useRoute();

const { appMenu } = DATA;

const { onActionGetUserInfo } = StoreApp();

const onRenderPath = () => {
  const { label } = appMenu.find(({ routeName }) => routeName === ROUTE.name);
  return `Trang chủ | ${label}`;
};

onMounted(() => {
  window.scrollTo(0, 0);
  if (accessToken.value) onActionGetUserInfo();
});
</script>
<template>
  <Toast class="toast w-21rem line-height-2" position="top-left" />

  <div
    :class="{ 'container-admin': ROUTE.name !== 'HomeAdmin' }"
    class="h-screen flex flex-column gap-3"
  >
    <!-- The header -->
    <TheHeader />

    <!-- Link -->
    <div v-if="ROUTE.name !== 'HomeAdmin'" class="mx-5">
      {{ onRenderPath() }}
    </div>

    <div class="flex-1">
      <div :class="{ card: ROUTE.name !== 'HomeAdmin' }" class="mx-5">
        <RouterView />
      </div>
    </div>

    <div class="text-center text-600 text-custom-mini py-3">
      Web Admin @Design by Tien Thanh
    </div>
  </div>
</template>

<style scoped>
.container-admin {
  background-color: #f8f9fa;
}
</style>
