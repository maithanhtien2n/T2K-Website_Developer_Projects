import { AxiosInstance } from "@/services/api";

class ApiHome {
  onApiGetProducts = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "products",
      data: {
        key_search: args?.key_search,
      },
    });
  };

  onApiGetNewNotifications = async (args) => {
    return await AxiosInstance({
      method: "GET",
      url: "accounts/notification",
      params: {
        account_id: args?.account_id || null,
        new_notification: args?.new_notification || null,
      },
    });
  };
}

export const API_HOME = new ApiHome();
