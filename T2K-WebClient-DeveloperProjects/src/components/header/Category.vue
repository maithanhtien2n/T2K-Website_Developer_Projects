<script setup>
import { accessToken, onDeleteAppLocalStorage } from "@/utils";
import { reactive, watch } from "vue";
import { StoreApp } from "@/services/stores";
import { useRoute, useRouter } from "vue-router";
import PopupAuth from "@/components/PopupAuth.vue";
import { updateAuthorizationHeader } from "@/services/api";
import { formatToVND, onLoadingPageRepeat } from "@/utils/index";
import { STORE_CART } from "../../services/stores";

const emits = defineEmits(["onEmitOpenPopupAuth"]);

const ROUTE = useRoute();

const ROUTER = useRouter();

const {
  onActionLoadingActive,
  onActionLogout,
  onGetterUserInfo: userInfo,
  onGetterCategoryPopup,
} = StoreApp();

const { onActionLogoutCart } = STORE_CART.StoreCart();

const data = reactive({
  display: {
    transform: window.innerWidth > 820 ? "translateX(0)" : "translateX(-100%)",
  },
  sizeScreen: window.innerWidth,
  settingOptions: ["Tài khoản", "Đăng xuất"],
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

const onHide = () => data.sizeScreen < 750 && accessToken.value;

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

const onClickItemOption = (value) => {
  onActionLoadingActive(true);
  switch (value) {
    case "Tài khoản":
      //
      break;
    case "Đăng xuất":
      onDeleteAppLocalStorage();
      updateAuthorizationHeader(null);
      onActionLogoutCart();
      onActionLogout();
      break;
  }
  setTimeout(() => onActionLoadingActive(false), 1000);
};

watch(onGetterCategoryPopup, () => {
  if (data.sizeScreen < 820) onClickClosePopup();
});
</script>

<template>
  <BackgroundRemovePopup
    v-if="data.sizeScreen < 820"
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

    <!-- Label đăng xuất -->
    <label
      v-if="onHide()"
      class="flex p-3 align-items-center gap-2 on-click p-error"
      @click="onClickItemOption('Đăng xuất')"
    >
      <i class="pi pi-sign-out p-error" />
      Đăng xuất
    </label>

    <!-- Label kho hàng -->
    <label
      v-if="accessToken"
      @click="onClickToWarehouse"
      class="category-item flex align-items-center gap-2 on-click"
    >
      <i class="pi pi-credit-card" />
      Kho hàng
    </label>

    <!-- Label đăng xuất -->
    <label
      v-if="onHide()"
      class="category-item flex align-items-center gap-2 on-click"
      @click="onClickItemOption('Tài khoản')"
    >
      <i class="pi pi-user" />
      Tài khoản
    </label>

    <!-- Label thông báo -->
    <label class="category-item flex align-items-center gap-2 on-click">
      <i class="pi pi-bell" />
      Thông báo
    </label>

    <!-- Thông tin người dùng -->
    <div
      v-if="userInfo?.account_id"
      class="info-user flex align-items-center gap-2 unselectable relative"
    >
      <img
        class="w-2rem h-2rem border-circle box-shadow-1"
        src="https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png"
      />
      <div class="flex flex-column gap-1 text-right">
        <span class="font-bold">{{ userInfo?.user_name }}</span>
        <span class="text-custom-mini">
          $ {{ formatToVND(userInfo?.user_info?.account_money) }}
        </span>
      </div>

      <i
        @click="onClickIconSetting"
        class="pi pi-spin pi-cog text-2xl on-click"
      />

      <div
        v-if="!onHide()"
        class="setting-option w-11rem py-2 overflow-hidden box-shadow-1 bg-white flex flex-column absolute top-100 right-0 border-round-2xl"
      >
        <span
          v-for="(item, index) in data.settingOptions"
          :key="index"
          :class="{ 'p-error': item === 'Đăng xuất' }"
          class="item-option cursor-pointer p-3 on-click"
          @click="onClickItemOption(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>

    <!-- Thanh đăng nhập, đăng ký -->
    <div v-else class="btn-login">
      <PopupAuth />
    </div>
  </div>
</template>

<style scoped>
.active-category-icon {
  display: none;
}

.setting-option {
  display: none !important;
}

.item-option:hover {
  background-color: #dadada;
}

.info-user:hover .setting-option {
  display: inline-flex !important;
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
