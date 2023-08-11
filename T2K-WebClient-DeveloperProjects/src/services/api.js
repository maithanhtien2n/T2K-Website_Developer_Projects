import axios from "axios";
import { accessToken } from "@/utils";

export * as API_HOME from "@/views/home/services/api";
export * as API_CART from "@/views/cart/services/api";
export * as API_PRODUCT from "@/views/products/services/api";
export * as API_WAREHOUSE from "@/views/warehouse/services/api";

class ApiApp {
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },

  onApiLogin = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "account/login",
      data: {
        user_name: args?.userName,
        password: args?.password,
      },
    });
  };

  onApiGetUserInfo = async (args) => {
    return await AxiosInstance({
      method: "GET",
      url: "user-info",
    });
  };
}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/v1/",

  // baseURL: "http://192.168.1.4:3000/api/v1/",

  baseURL: "http://192.168.88.21:3000/api/v1/",
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

updateAuthorizationHeader(accessToken.value);

export { AxiosInstance, updateAuthorizationHeader };
