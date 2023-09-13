<script setup>
import { reactive, ref, watch } from "vue";
import AppMenu from "./AppMenu.vue";
import { StoreApp } from "@/services/stores";
import { onDeleteAppLocalStorage } from "@/utils";
import { updateAuthorizationHeader } from "@/services/api";
import { useRouter } from "vue-router";

const ROUTER = useRouter();

const { onActionLoadingActive, onActionLogout, onGetterUserInfo } = StoreApp();

const data = reactive({
  userData: {
    account_id: null,
    user_name: "",
    role: "",
    role_name: "",
    type_account: "",
  },
  userInfo: {
    user_id: null,
    image: null,
    full_name: "",
    phone_number: "",
    day_of_birth: "",
    gender: "",
  },
});

const visibleLeft = ref(false);

const settingOptions = ref(["Tài khoản", "Đăng xuất"]);

const onClickItemOption = (value) => {
  switch (value) {
    case "Tài khoản":
      //
      break;
    case "Đăng xuất":
      onActionLoadingActive(true);
      localStorage.removeItem("AppLocalStorage");
      updateAuthorizationHeader(null);
      onActionLogout();
      ROUTER.push({ name: "LoginAdmin" });
      setTimeout(() => onActionLoadingActive(false), 1000);
      break;
  }
};

watch(onGetterUserInfo, (value) => {
  Object.keys(data.userData).forEach((key) => {
    data.userData[key] = value[key];
  });
  data.userInfo = value?.user_info;
});
</script>

<template>
  <Sidebar v-model:visible="visibleLeft" class="w-17rem">
    <AppMenu @onEmitCloseSidebar="visibleLeft = false" />
  </Sidebar>

  <div
    class="the-header py-4 flex align-items-center justify-content-between px-5"
  >
    <div class="flex align-items-center gap-5">
      <i
        class="icon-bars pi pi-bars cursor-pointer"
        @click="visibleLeft = true"
      />

      <!-- Logo thương hiệu -->
      <div
        @click="ROUTER.push({ name: 'HomeAdmin' })"
        class="text-custom-1 font-bold text-main-color on-click"
      >
        D e v P r o j e c t s
      </div>
    </div>

    <!-- Thông tin người dùng -->
    <div>
      <div
        class="info-user flex align-items-center gap-2 unselectable relative cursor-pointer"
      >
        <img
          class="w-2rem h-2rem border-circle box-shadow-1 object-fit-cover"
          :src="data.userInfo.image || '../../../public/images/avatar.jpg'"
        />
        <div class="flex flex-column gap-1 text-right">
          <span class="font-bold text-800">{{ data.userInfo.full_name }}</span>
          <span class="text-custom-mini text-700">
            {{ data.userData.role_name }}
          </span>
        </div>

        <i
          @click="onClickIconSetting"
          class="pi pi-spin pi-cog text-2xl on-click"
        />

        <div
          class="setting-option w-11rem py-2 overflow-hidden box-shadow-1 bg-white flex flex-column absolute top-100 right-0 border-round-2xl"
        >
          <span
            v-for="(item, index) in settingOptions"
            :key="index"
            :class="{ 'p-error': item === 'Đăng xuất' }"
            class="item-option cursor-pointer p-3"
            @click="onClickItemOption(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-bars {
  font-size: 1.3rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #5c5c5c;
}

.icon-bars:hover {
  background-color: #dadada;
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

.the-header {
  height: 4.3rem !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  background-color: #fff;
}
</style>
