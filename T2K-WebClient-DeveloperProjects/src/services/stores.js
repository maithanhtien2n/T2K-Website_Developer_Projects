import { defineStore } from "pinia";
import { API_APP } from "./api";
import { computed, ref } from "vue";

export * as STORE_WAREHOUSE from "@/views/warehouse/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // State
  const loadingActive = ref(false);

  // Getter
  const onGetterLoadingActive = computed(() => loadingActive);

  // Action
  const onActionLoadingActive = (bl) => {
    loadingActive.value = bl;
  };

  // const onActionAccountRegister = async (args) => {
  //   return await API_APP.onApiAccountRegister(args)
  //     .then(({ data: res }) => {
  //       if (res.statusCode === 200) {
  //         return "OK";
  //       }
  //       if (res.statusCode === 210) {
  //         return "EXIST";
  //       } else {
  //         throw res.statusValue;
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Lỗi: " + error);
  //     });
  // };

  return {
    // Getter
    onGetterLoadingActive,
    // Action
    onActionLoadingActive,
  };
});
