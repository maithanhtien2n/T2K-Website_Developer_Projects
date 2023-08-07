import { AxiosInstance } from "@/services/api";

class ApiProduct {
  onApiGetProducts = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "products",
    });
  };

  onApiGetProductDetail = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `product/${params}`,
    });
  };

  onApiSendEvaluate = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `product/evaluate`,
      data: {
        user_id: `${args?.user_id}` || null,
        product_id: args?.product_id || null,
        start_amount: `${args?.start_amount}` || null,
        content: args?.content || null,
      },
    });
  };
}

export const API_PRODUCT = new ApiProduct();
