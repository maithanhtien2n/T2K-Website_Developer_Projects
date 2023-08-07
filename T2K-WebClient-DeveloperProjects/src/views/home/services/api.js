import { AxiosInstance } from "@/services/api";

class ApiHome {
  onApiGetProducts = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "products",
    });
  };
}

export const API_HOME = new ApiHome();
