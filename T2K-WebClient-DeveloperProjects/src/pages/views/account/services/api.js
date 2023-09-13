import { AxiosInstance } from "@/services/api";

class ApiAccount {
  onApiGetAccounts = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "accounts",
      params: {
        status: args?.status || null,
        key_search: args?.key_search || null,
      },
    });
  };

  onApiUpdateStatus = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: "accounts",
      params: {
        account_id: args?.account_id || null,
        status: args?.status || null,
      },
    });
  };

  onApiRechargeAccount = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "accounts/recharge",
      data: {
        account_id: args?.account_id || "",
        deposit_amount: args?.depositAmount || 0,
      },
    });
  };
}

export const API_ACCOUNT = new ApiAccount();
