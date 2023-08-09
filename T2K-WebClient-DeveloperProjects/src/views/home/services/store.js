import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { API_HOME } from "@/services/api";
import { Utils } from "@/utils/response";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreHome = defineStore("StoreHome", () => {
  const { onResponse } = Utils();

  const API = API_HOME.API_HOME;

  // State
  const products = ref([]);

  // Getter
  const onGetterProducts = computed(() => products);

  // Action
  const onActionGetProducts = async (args) => {
    const result = await onResponse(API.onApiGetProducts(args));
    return (products.value = result.data);
  };

  return {
    // Getter
    onGetterProducts,
    // Action
    onActionGetProducts,
  };
});
