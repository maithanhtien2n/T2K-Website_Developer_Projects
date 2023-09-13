<script setup>
import { StoreApp } from "@/services/stores";

window.scrollTo(0, 0);

const { onGetterLoadingActive } = StoreApp();
</script>

<template>
  <!-- Loading -->
  <div v-if="onGetterLoadingActive">
    <div class="loading-overlay"></div>
    <div class="loading-content flex flex-column gap-3">
      <ProgressSpinner />
      <span>Đang tải...</span>
    </div>
  </div>

  <Dialog v-model:visible="onGetterLoadingActive" modal class="opacity-0" />
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
  background-image: linear-gradient(to top, #dadada, var(--mainColor));
  z-index: 9999999999 !important;
}

.loading-content {
  position: absolute;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999999;
}
</style>
