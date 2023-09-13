<script setup>
import { onMounted, watch } from "vue";
import { accessToken } from "@/utils";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from "@/components/common/Loading.vue";
import { StoreApp, STORE_CART, STORE_HOME } from "@/services/stores";
import PopupAdvertisement from "@/components/common/PopupAdvertisement.vue";

const { onActionGetUserInfo } = StoreApp();

const { onActionGetCarts } = STORE_CART.StoreCart();

const { onActionGetNewNotifications } = STORE_HOME.StoreHome();

const onUpdateData = () => {
  window.scrollTo(0, 0);
  if (accessToken.value)
    onActionGetUserInfo().then((userInfo) => {
      onActionGetCarts(userInfo?.user_info?.user_id);
      onActionGetNewNotifications({
        account_id: userInfo.account_id,
        new_notification: "NEW",
      });
    });
};

watch(
  () => accessToken.value,
  () => {
    onUpdateData();
  }
);

onMounted(() => {
  onUpdateData();
});
</script>

<template>
  <!-- Popup -->
  <PopupAdvertisement />

  <Toast class="toast w-21rem line-height-2" position="top-left" />

  <PopupNotification />
  <!-- ----------------- -->

  <div class="h-screen flex flex-column gap-3">
    <TheHeader />

    <div class="flex-1">
      <router-view />
    </div>

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
