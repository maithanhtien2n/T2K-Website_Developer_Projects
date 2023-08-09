import { AxiosInstance } from "@/services/api";

class ApiCart {
  onApiGetCarts = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `products/carts?user_id=${params}`,
    });
  };

  onApiRemoveCart = async (params) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `products/cart?ids=${params}`,
    });
  };

  onApiAddItemCart = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "products/cart",
      data: {
        user_id: `${args?.user_id}`,
        product_id: `${args?.product_id}`,
        vip: `${args?.vip}`,
      },
    });
  };

  onApiPaymentCart = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "products/order",
      data: args,
    });
  };
}

export const API_CART = new ApiCart();
