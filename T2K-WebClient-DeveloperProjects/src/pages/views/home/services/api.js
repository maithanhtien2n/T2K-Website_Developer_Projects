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
}

export const API_HOME = new ApiHome();
