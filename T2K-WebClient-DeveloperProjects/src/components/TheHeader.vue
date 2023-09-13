<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Category from "@/components/header/Category.vue";
import SearchBox from "@/components/header/SearchBox.vue";
import { onLoadingPageRepeat, formatToVND } from "@/utils";
import { StoreApp, STORE_CART, STORE_HOME } from "@/services/stores";

const ROUTER = useRouter();

const ROUTE = useRoute();

const { onActionLoadingActive } = StoreApp();

const { onGetterCarts } = STORE_CART.StoreCart();

const { onGetterNewNotifications } = STORE_HOME.StoreHome();

const data = reactive({
  displaySearch: "translateX(-100%)",
  resetKeySearch: false,
  displayNotification: false,
  sizeScreen: window.innerWidth,
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

const onClickIconNotification = () => {
  if (data.sizeScreen < 550) {
    ROUTER.push({ name: "Notification" });
  } else {
    data.displayNotification = true;
  }
};

const onClickRemovePopup = () => {
  data.displayNotification = false;
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

        <BackgroundRemovePopup
          :display="data.displayNotification"
          @onRemovePopup="onClickRemovePopup"
          class="opacity-0"
        />
        <!-- Label thông báo -->
        <label
          @click="onClickIconNotification"
          class="category-item relative flex align-items-center gap-2"
        >
          <i style="font-size: 1.3rem" class="pi pi-bell text-900 on-click-3" />

          <span
            v-if="onGetterNewNotifications.length"
            style="background-color: rgb(230, 49, 49)"
            class="count-cart text-white absolute font-bold flex align-items-center justify-content-center border-circle"
          >
            {{ onGetterNewNotifications.length }}
          </span>

          <!-- Popup thông báo -->
          <div
            v-if="data.displayNotification"
            class="card p-0 absolute w-23rem right-0 top-100 flex flex-column gap-3 pb-3"
          >
            <span class="pt-3 pl-3">Thông báo</span>

            <div class="item-notification flex flex-column gap-3 on-click">
              <div class="flex gap-2 px-3 py-2">
                <img
                  class="w-2rem h-2rem object-fit-cover pt-1"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Microsoft_Edge_Dev_Logo_%282018%29.svg/768px-Microsoft_Edge_Dev_Logo_%282018%29.svg.png"
                  alt="Lỗi ảnh"
                />
                <div class="flex flex-column gap-1">
                  <span class="line-height-2 text-700">
                    Chúng tôi vừa nạp thành công 200.000đ vào tài khoản của bạn!
                  </span>
                  <span class="text-custom-mini text-700">7:00 12/09/2023</span>
                </div>
              </div>
            </div>
          </div>
        </label>

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

.item-notification {
  transition: all 0.2s ease;
}

.item-notification:hover {
  background-color: #ececec;
}

/* Tùy chỉnh kích thước giao diện */
@media only screen and (max-width: 1165px) {
  .active-category-icon {
    display: block !important;
  }
}
</style>
