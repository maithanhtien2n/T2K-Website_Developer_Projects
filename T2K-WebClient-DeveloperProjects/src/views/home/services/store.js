import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { API_HOME } from "@/services/api";
import { Utils } from "@/utils/response";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreHome = defineStore("StoreHome", () => {
  const { onResponse } = Utils();

  const API = API_HOME.API_HOME;

  // State
  const products = reactive([]);

  // Getter
  const onGetterProducts = computed(() => products);

  // Action
  const onActionGetProducts = async () => {
    const result = await onResponse(API.onApiGetProducts());
    return Object.assign(products, [...result.data]);
  };

  return {
    // Getter
    onGetterProducts,
    // Action
    onActionGetProducts,
  };
});
