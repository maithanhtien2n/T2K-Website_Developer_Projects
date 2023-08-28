<script setup>
import { reactive } from "vue";
import { onLoadingPageRepeat, formatToVND } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import Category from "@/components/header/Category.vue";
import { StoreApp, STORE_CART } from "@/services/stores";
import SearchBox from "@/components/header/SearchBox.vue";

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const { onGetterCarts } = STORE_CART.StoreCart();

const data = reactive({
  displaySearch: "translateX(-100%)",
  resetKeySearch: false,
});

const onClickLogo = () => {
  data.resetKeySearch = !data.resetKeySearch;
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
        :resetKeySearch="data.resetKeySearch"
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
        <div @click="onClickToCart" class="icon-cart relative">
          <i class="pi pi-shopping-cart text-2xl text-900 on-click-3" />
          <span
            v-if="onGetterCarts?.length"
            class="count-cart bg-main-color text-white absolute font-bold flex align-items-center justify-content-center border-circle"
          >
            {{ onGetterCarts?.length }}
          </span>

          <!-- Preview -->
          <!-- <div
            style="transform: translateX(20%)"
            class="cart-preview w-23rem card absolute top-100 right-0 py-2 px-0 z-5"
            @click.stop
          >
            <div class="flex flex-column">
              <div class="item-cart flex gap-2 on-click p-2 px-3">
                <img
                  class="w-4rem h-4rem object-fit-cover"
                  src="https://static.wikia.nocookie.net/bach-khoa-the-gioi-toan-thu/images/e/e4/Son_goku.png"
                  alt=""
                />

                <div class="flex flex-column gap-1">
                  <span class="w-full fixed-text">
                    Làm thế nào để học HTML và CSS từ đầu một cách nhanh chóng?
                  </span>
                  <span class="p-error">{{ formatToVND(500000) }}</span>
                </div>
              </div>

              <div class="item-cart flex gap-2 on-click p-2 px-3">
                <img
                  class="w-4rem h-4rem object-fit-cover"
                  src="https://static.wikia.nocookie.net/bach-khoa-the-gioi-toan-thu/images/e/e4/Son_goku.png"
                  alt=""
                />

                <div class="flex flex-column gap-1">
                  <span class="w-full fixed-text">
                    Làm thế nào để học HTML và CSS từ đầu một cách nhanh chóng?
                  </span>
                  <span class="p-error">{{ formatToVND(500000) }}</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>

        <Category />
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

.item-cart {
  transition: all 0.2s ease;
}

.item-cart:hover {
  background-color: #ddd;
}

.cart-preview {
  display: none;
}

.icon-cart:hover .cart-preview {
  display: block !important;
}

/* Tùy chỉnh kích thước giao diện */
@media only screen and (max-width: 1165px) {
  .active-category-icon {
    display: block !important;
  }
}
</style>
