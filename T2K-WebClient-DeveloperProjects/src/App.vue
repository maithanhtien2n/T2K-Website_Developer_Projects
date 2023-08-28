<script setup>
import { onMounted } from "vue";
import { accessToken } from "@/utils";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from "@/components/common/Loading.vue";
import { StoreApp, STORE_CART } from "@/services/stores";
import PopupAdvertisement from "@/components/common/PopupAdvertisement.vue";

const { onActionGetUserInfo } = StoreApp();

const { onActionGetCarts } = STORE_CART.StoreCart();

onMounted(() => {
  window.scrollTo(0, 0);
  if (accessToken.value)
    onActionGetUserInfo().then((userInfo) => {
      onActionGetCarts(userInfo?.user_info?.user_id);
    });
});
</script>

<template>
  <!-- Popup -->
  <PopupAdvertisement />

  <Toast class="toast w-21rem line-height-2" position="top-left" />

  <PopupNotification />
  <!-- ----------------- -->

  <div class="flex flex-column gap-3">
    <TheHeader />

    <router-view />

    <TheFooter />
  </div>

  <Loading />
</template>

<style scoped>
@media only screen and (max-width: 750px) {
  .toast {
    width: 20rem !important;
  }
}
</style>
