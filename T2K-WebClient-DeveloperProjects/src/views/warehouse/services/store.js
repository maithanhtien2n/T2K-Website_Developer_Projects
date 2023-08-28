import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_WAREHOUSE } from "@/services/api";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreWarehouse = defineStore("StoreWarehouse", () => {
  const { onResponse } = Utils();

  const API = API_WAREHOUSE.API_WAREHOUSE;

  // State
  const warehouses = ref([]);

  // Getter
  const onGetterWarehouses = computed(() => warehouses);

  // Action
  const onActionGetWarehouses = async (params) => {
    const result = await onResponse(API.onApiGetWarehouses(params));
    warehouses.value = result.data;
    return result;
  };

  return {
    // Getter
    onGetterWarehouses,
    // Action
    onActionGetWarehouses,
  };
});
