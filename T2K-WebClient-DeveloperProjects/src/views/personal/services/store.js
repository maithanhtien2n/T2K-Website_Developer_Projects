import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_PERSONAL } from "@/services/api";
import { Utils } from "@/utils/response";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StorePersonal = defineStore("StorePersonal", () => {
  const { onResponse } = Utils();

  const API = API_PERSONAL.API_PERSONAL;

  // State
  const personal = ref([]);
  const warehouses = ref([]);

  // Getter
  const onGetterPersonal = computed(() => personal);
  const onGetterWarehouses = computed(() => warehouses);

  // Action
  // - Store hồ sơ
  const onActionSaveInfoPersonal = async (args) => {
    return await onResponse(API.onApiSaveInfoPersonal(args), true);
  };
  // ------------------------------------------------------------------------

  // - Store kho hàng
  const onActionGetWarehouses = async (params) => {
    const result = await onResponse(API.onApiGetWarehouses(params));
    warehouses.value = result.data;
    return result;
  };
  // -------------------------------------------------------------------------

  return {
    // Getter
    // - Hồ sơ getter
    onGetterPersonal,

    // - Kho hàng getter
    onGetterWarehouses,

    // Action
    // - Hồ sơ action
    onActionSaveInfoPersonal,

    // - Kho hàng action
    onActionGetWarehouses,
  };
});
