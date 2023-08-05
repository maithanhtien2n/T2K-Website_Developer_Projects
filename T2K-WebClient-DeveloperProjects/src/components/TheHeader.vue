<script setup>
import SearchBox from "@/components/header/SearchBox.vue";
import Category from "@/components/header/Category.vue";
import PopupAuth from "@/components/PopupAuth.vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";
import { onLoadingPageRepeat } from "@/utils";

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const data = reactive({
  displaySearch: "translateX(-100%)",
  displayLogin: false,
});

const onClickLogo = () => {
  onLoadingPageRepeat(
    ROUTE.name === "Home",
    onActionLoadingActive,
    ROUTER.push({ name: "Home" })
  );
};

const onClickToCart = () => {
  onLoadingPageRepeat(
    ROUTE.name === "Cart",
    onActionLoadingActive,
    ROUTER.push({ name: "Cart" })
  );
};
</script>

<template>
  <PopupAuth
    :displayLogin="data.displayLogin"
    @onEmitClosePopupAuth="data.displayLogin = false"
  />

  <div
    style="
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    "
    class="fixed top-0 left-0 right-0 z-5 h-4rem bg-main-left unselectable"
  >
    <div
      class="container h-full flex align-items-center justify-content-between"
    >
      <!-- Logo thương hiệu -->
      <div
        @click="onClickLogo"
        class="text-custom-1 font-bold text-white on-click"
      >
        D e v P r o j e c t s
      </div>

      <!-- Hộp tìm kiếm -->
      <SearchBox
        :displaySearch="data.displaySearch"
        @onClosePopup="data.displaySearch = 'translateX(-100%)'"
      />

      <div class="flex align-items-center gap-5">
        <!-- Icon tìm kiếm -->
        <i
          @click="data.displaySearch = 'translateX(0)'"
          style="font-size: 1.2rem"
          class="pi pi-search active-category-icon text-900 on-click-3 font-bold"
        />

        <!-- Icon giỏ hàng -->
        <div
          v-if="ROUTE.name !== 'Cart'"
          @click="onClickToCart"
          class="relative on-click-3"
        >
          <i class="pi pi-shopping-cart text-2xl text-900 on-click" />
          <span
            class="count-cart bg-main-color text-white absolute font-bold flex align-items-center justify-content-center border-circle"
            >12</span
          >
        </div>

        <Category @onEmitOpenPopupAuth="data.displayLogin = true" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.count-cart {
  font-size: 0.7rem;
  top: -0.6rem;
  right: -0.8rem;
  width: 1.2rem;
  height: 1.2rem;
}

.active-category-icon {
  display: none;
}

/* Tùy chỉnh kích thước giao diện */
@media only screen and (max-width: 1165px) {
  .active-category-icon {
    display: block !important;
  }
}
</style>
