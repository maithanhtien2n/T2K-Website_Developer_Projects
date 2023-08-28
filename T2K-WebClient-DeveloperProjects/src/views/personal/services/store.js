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

  // Getter
  const onGetterPersonal = computed(() => personal);

  // Action
  const onActionSaveInfoPersonal = async (args) => {
    console.log(args);
    return await onResponse(API.onApiSaveInfoPersonal(args), true);
  };

  return {
    // Getter
    onGetterPersonal,

    // Action
    onActionSaveInfoPersonal,
  };
});
