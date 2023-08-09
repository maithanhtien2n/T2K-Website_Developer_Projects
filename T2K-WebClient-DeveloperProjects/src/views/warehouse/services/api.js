import { AxiosInstance } from "@/services/api";

class ApiWarehouses {
  onApiGetWarehouses = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `products/orders?user_id=${params}`,
    });
  };
}

export const API_WAREHOUSE = new ApiWarehouses();
