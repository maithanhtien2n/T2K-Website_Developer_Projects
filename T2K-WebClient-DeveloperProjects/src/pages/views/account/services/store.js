import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_ACCOUNT } from "@/services/api";
import { Utils } from "@/utils/response";
import { stringWithoutAccents } from "@/utils";

// export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreAccount = defineStore("StoreAccount", () => {
  const { onResponse } = Utils();

  const API = API_ACCOUNT.API_ACCOUNT;

  // State
  const accounts = ref([]);
  const accountsOption = ref([]);

  // Getter
  const onGetterAccounts = computed(() => accounts);
  const onGetterAccountsOption = computed(() => accountsOption);

  // Action
  const onActionGetAccounts = async (args) => {
    const result = await onResponse(API.onApiGetAccounts(args));
    return (accounts.value = result.data);
  };

  const onActionUpdateStatus = async (args) => {
    return await onResponse(API.onApiUpdateStatus(args), true);
  };

  const onActionGetAccountsOption = async (args) => {
    const result = await onResponse(API.onApiGetAccounts(args));
    return (accountsOption.value = result.data.map((item) => ({
      id: item?.account_id,
      name: item?.full_name,
      nameWithoutAccents: stringWithoutAccents(item?.full_name),
      code: item?.user_name,
      phone_number: item?.phone_number,
      day_of_birth: item?.day_of_birth,
      gender: item?.gender,
      account_money: item?.account_money,
    })));
  };

  const onActionRechargeAccount = async (args) => {
    console.log(args);
    return await onResponse(API.onApiRechargeAccount(args), true);
  };

  return {
    // Getter
    onGetterAccounts,
    onGetterAccountsOption,

    // Action
    onActionGetAccounts,
    onActionUpdateStatus,
    onActionGetAccountsOption,
    onActionRechargeAccount,
  };
});
