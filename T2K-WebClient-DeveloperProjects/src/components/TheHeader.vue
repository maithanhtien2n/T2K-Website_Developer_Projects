<script setup>
import SearchBox from "@/components/header/SearchBox.vue";
import Category from "@/components/header/Category.vue";
import PopupAuth from "@/components/PopupAuth.vue";
import { reactive } from "vue";

const data = reactive({
  displaySearch: "translateX(-100%)",
  displayLogin: false,
});
</script>

<template>
  <PopupAuth
    :displayLogin="data.displayLogin"
    @onEmitClosePopupAuth="data.displayLogin = false"
  />

  <div class="h-4rem bg-main-left unselectable px-3">
    <div
      class="container h-full flex align-items-center justify-content-between"
    >
      <!-- Logo thương hiệu -->
      <div class="text-custom-1 font-bold text-white on-click">
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
          class="pi pi-search active-category-icon text-900 on-click font-bold"
        />

        <!-- Icon giỏ hàng -->
        <div class="relative">
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
@media only screen and (max-width: 1335px) {
  .container {
    width: 95% !important;
    position: relative;
  }
}

@media only screen and (max-width: 1165px) {
  .active-category-icon {
    display: block !important;
  }
}

@media only screen and (max-width: 750px) {
  .container {
    width: 100% !important;
  }
}
</style>
