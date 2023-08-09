import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_CART } from "@/services/api";
import { Utils } from "@/utils/response";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreCart = defineStore("StoreCart", () => {
  const { onResponse } = Utils();

  const API = API_CART.API_CART;

  // State
  const carts = ref([]);

  // Getter
  const onGetterCarts = computed(() => carts);

  // Methos
  const onActionLogoutCart = () => {
    carts.value = [];
  };

  // Action
  const onActionGetCarts = async (params) => {
    const result = await onResponse(API.onApiGetCarts(params));
    carts.value = result.data;
    return result;
  };

  const onActionAddItemCart = async (args) => {
    return await onResponse(API.onApiAddItemCart(args), true);
  };

  const onActionRemoveCart = async (params) => {
    return await onResponse(API.onApiRemoveCart(params), true);
  };

  const onActionPaymentCart = async (args) => {
    return await onResponse(API.onApiPaymentCart(args));
  };

  return {
    // Getter
    onGetterCarts,
    // Action
    onActionLogoutCart,

    onActionGetCarts,
    onActionAddItemCart,
    onActionRemoveCart,
    onActionPaymentCart,
  };
});
