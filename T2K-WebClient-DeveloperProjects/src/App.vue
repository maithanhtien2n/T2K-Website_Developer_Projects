<script setup>
import { onMounted } from "vue";
import { appLocalStorage } from "@/utils";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from "@/components/common/Loading.vue";
import { StoreApp, STORE_CART } from "@/services/stores";
import { updateAuthorizationHeader } from "@/services/api";

const { token } = appLocalStorage();

const { onActionGetUserInfo } = StoreApp();

const { onActionGetCarts } = STORE_CART.StoreCart();

onMounted(() => {
  window.scrollTo(0, 0);
  if (token) {
    onActionGetUserInfo().then((userInfo) => {
      localStorage.setItem("AppLocalStorage", JSON.stringify(userInfo));
      onActionGetCarts(userInfo?.user_info?.user_id);
    });
  }
});
</script>

<template>
  <Toast class="w-20rem line-height-2" position="top-left" />

  <div class="flex flex-column gap-3">
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>

  <Loading />
</template>

<style scoped></style>
