import { API_APP } from "./api";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { Utils } from "@/utils/response";

export * as STORE_HOME from "@/views/home/services/store";
export * as STORE_CART from "@/views/cart/services/store";
export * as STORE_WAREHOUSE from "@/views/warehouse/services/store";
export * as STORE_PRODUCT from "@/views/products/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  const { onResponse } = Utils();

  // State
  const loadingActive = ref(false);

  const userInfo = reactive({});

  // Getter
  const onGetterLoadingActive = computed(() => loadingActive);

  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionLoadingActive = (bl) => {
    loadingActive.value = bl;
  };

  // Đăng nhập
  const onActionLogin = async (args) => {
    return await onResponse(API_APP.onApiLogin(args));
  };

  // Lấy thông tin người dùng
  const onActionGetUserInfo = async () => {
    const result = await onResponse(API_APP.onApiGetUserInfo());
    return Object.assign(userInfo, { ...result.data });
  };

  return {
    // Getter
    onGetterLoadingActive,
    onGetterUserInfo,

    // Action
    onActionLoadingActive,
    onActionGetUserInfo,
    onActionLogin,
  };
});
