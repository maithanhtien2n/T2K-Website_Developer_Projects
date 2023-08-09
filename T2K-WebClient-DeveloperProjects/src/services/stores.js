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
  const popupInfo = ref({
    display: false,
  });
  const displayPopupAuth = ref(false);
  const displayAdvertisement = ref(true);
  const categoryPopup = ref(false);

  const userInfo = ref({});

  // Getter
  const onGetterLoadingActive = computed(() => loadingActive);
  const onGetterPopupInfo = computed(() => popupInfo);
  const onGetterDisplayPopupAuth = computed(() => displayPopupAuth);
  const onGetterDisplayAdvertisement = computed(() => displayAdvertisement);
  const onGetterCategoryPopup = computed(() => categoryPopup);

  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionLoadingActive = (bl) => {
    loadingActive.value = bl;
  };

  const onActionOpenPopupAuth = () => {
    displayPopupAuth.value = !displayPopupAuth.value;
  };

  const onActionPopupNotification = ({
    display,
    title,
    icon,
    content1,
    content2,
    action,
  }) => {
    setTimeout(
      () => {
        popupInfo.value.display = display;
      },
      display ? 1000 : 0
    );
    popupInfo.value.title = title;
    popupInfo.value.icon = icon;
    popupInfo.value.content1 = content1;
    popupInfo.value.content2 = content2;
    popupInfo.value.action = action;
  };

  const onActionDisplayAdvertisement = (bl) => {
    displayAdvertisement.value = bl;
  };

  // Đăng nhập
  const onActionLogin = async (args) => {
    categoryPopup.value = !categoryPopup.value;
    return await onResponse(API_APP.onApiLogin(args));
  };

  const onActionLogout = () => {
    categoryPopup.value = !categoryPopup.value;
    return (userInfo.value = null);
  };

  // Lấy thông tin người dùng
  const onActionGetUserInfo = async () => {
    const result = await onResponse(API_APP.onApiGetUserInfo());
    return (userInfo.value = result.data);
  };

  return {
    // Getter
    onGetterLoadingActive,
    onGetterPopupInfo,
    onGetterDisplayPopupAuth,
    onGetterDisplayAdvertisement,
    onGetterCategoryPopup,

    onGetterUserInfo,

    // Action
    onActionLoadingActive,
    onActionPopupNotification,
    onActionOpenPopupAuth,
    onActionDisplayAdvertisement,

    onActionGetUserInfo,
    onActionLogin,
    onActionLogout,
  };
});
