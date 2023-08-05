<script setup>
import BackgroundRemovePopup from "@/components/common/BackgroundRemovePopup.vue";
import { reactive } from "vue";
import { formatToVND, onLoadingPageRepeat } from "@/utils/index";
import { StoreApp } from "@/services/stores";
import { useRoute, useRouter } from "vue-router";

const emits = defineEmits(["onEmitOpenPopupAuth"]);

const ROUTE = useRoute();

const ROUTER = useRouter();

const { onActionLoadingActive } = StoreApp();

const data = reactive({
  display: {
    transform: window.innerWidth > 820 ? "translateX(0)" : "translateX(-100%)",
  },
  sizeScreen: window.innerWidth,
});

window.addEventListener("resize", () => {
  data.display.transform =
    window.innerWidth > 820 || data.display.transform === "translateX(0)"
      ? "translateX(0)"
      : "translateX(-100%)";
  data.sizeScreen = window.innerWidth;
});

const onActive = () => {
  if (data.sizeScreen < 820) return data.display.transform === "translateX(0)";
};

const onClickClosePopup = () => {
  data.display.transform = "translateX(-100%)";
};

const onClickToWarehouse = () => {
  onLoadingPageRepeat(
    ROUTE.name === "Warehouse",
    onActionLoadingActive,
    ROUTER.push({ name: "Warehouse" })
  );
  if (data.sizeScreen < 820) onClickClosePopup();
};

const onClickOpenPopupAuth = () => {
  emits("onEmitOpenPopupAuth");
  // onClickClosePopup();
};
</script>

<template>
  <BackgroundRemovePopup
    :display="onActive()"
    @onRemovePopup="onClickClosePopup"
  />

  <!-- Icon mở popup -->
  <div
    @click="data.display.transform = 'translateX(0)'"
    class="active-category-icon"
  >
    <div
      class="bg-main-color w-2rem h-2rem border-circle flex justify-content-center align-items-center"
    >
      <i class="pi pi-bars text-white" />
    </div>
  </div>

  <div :style="data.display" class="category flex gap-5">
    <!-- Icon đóng popup -->
    <i
      @click="onClickClosePopup"
      style="top: 0.5rem; right: 0.5rem"
      class="active-category-icon pi pi-times absolute on-click"
    />

    <!-- Label kho hàng -->
    <label
      @click="onClickToWarehouse"
      class="category-item flex align-items-center gap-1 on-click"
    >
      <i class="pi pi-home" />
      Kho hàng
    </label>

    <!-- Label thông báo -->
    <label class="category-item flex align-items-center gap-1 on-click">
      <i class="pi pi-bell" />
      Thông báo
    </label>

    <!-- Thông tin người dùng -->
    <div
      v-if="true"
      class="info-user flex align-items-center gap-2 unselectable"
    >
      <img
        class="w-2rem h-2rem border-circle box-shadow-1"
        src="https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png"
      />
      <div class="flex flex-column gap-1 text-right">
        <span class="font-bold">tienthanh2000</span>
        <span class="text-custom-mini">$ {{ formatToVND(20000000) }}</span>
      </div>

      <i class="pi pi-spin pi-cog text-2xl on-click" />
    </div>

    <!-- Thanh đăng nhập, đăng ký -->
    <div v-else class="btn-login">
      <Button
        @click="onClickOpenPopupAuth"
        label="Đăng nhập"
        class="p-button-secondary"
      />
    </div>
  </div>
</template>

<style scoped>
.active-category-icon {
  display: none;
}

@media only screen and (max-width: 820px) {
  .active-category-icon {
    display: block !important;
  }

  .category {
    z-index: 999 !important;
    padding: 0.5rem;
    width: 17rem;
    flex-direction: column-reverse;
    justify-content: left;
    position: fixed !important;
    gap: 0 !important;
    top: 0;
    left: 0;
    bottom: 0;
    transition: all 0.3s ease;
    background-image: linear-gradient(to right, #dadada, var(--mainColor));
  }

  .category-item,
  .info-user {
    padding: 1rem;
    transition: all 0.2s ease;
  }

  .category-item:hover {
    background-color: #fff;
  }

  .btn-login {
    padding: 1rem;
  }
}
</style>
