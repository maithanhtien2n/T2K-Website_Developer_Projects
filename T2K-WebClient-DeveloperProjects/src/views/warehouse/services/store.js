import { defineStore } from "pinia";
import { API_WAREHOUSE } from "@/services/api";
import { computed, reactive } from "vue";
import { onResponse } from "@/utils/response";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreWarehouse = defineStore("StoreWarehouse", () => {
  const API = API_WAREHOUSE.API_WAREHOUSE;

  // State
  const warehouses = reactive([]);

  // Getter
  const onGetterWarehouses = computed(() => warehouses);

  // Action
  const onActionGetWarehouses = async () => {
    const result = await onResponse(API.onApiGetWarehouses());
    return Object.assign(warehouses, [...result.data]);
  };

  return {
    // Getter
    onGetterWarehouses,
    // Action
    onActionGetWarehouses,
  };
});
