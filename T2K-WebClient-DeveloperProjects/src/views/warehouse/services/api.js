import { AxiosInstance } from "@/services/api";

class ApiWarehouses {
  onApiGetWarehouses = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `products/orders`,
      params: {
        user_id: params?.user_id || null,
        key_search: params?.key_search || "",
      },
    });
  };
}

export const API_WAREHOUSE = new ApiWarehouses();
