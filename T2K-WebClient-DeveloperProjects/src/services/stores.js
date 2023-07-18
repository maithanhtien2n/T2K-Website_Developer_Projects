import { defineStore } from "pinia";
import { API_APP } from "./api";

export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // State

  // Getter

  // Action
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
    // Action
  };
});
