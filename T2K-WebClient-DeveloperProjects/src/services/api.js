import axios from "axios";
import { accessToken } from "@/utils";

// Web client
export * as API_HOME from "@/views/home/services/api";
export * as API_CART from "@/views/cart/services/api";
export * as API_PRODUCT from "@/views/products/services/api";
export * as API_WAREHOUSE from "@/views/warehouse/services/api";
export * as API_PERSONAL from "@/views/personal/services/api";

// Web admin
export * as API_ACCOUNT from "@/pages/views/account/services/api";

class ApiApp {
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },

  onApiLogin = async (args, type_account) => {
    return await AxiosInstance({
      method: "POST",
      url: "account/login",
      data: {
        user_name: args?.userName || null,
        password: args?.password || null,
        type_account: type_account || null,
      },
    });
  };

  onApiRegisterAccount = async (args, type_account) => {
    return await AxiosInstance({
      method: "POST",
      url: "account/register",
      data: {
        full_name: args?.fullName || null,
        phone_number: args?.phoneNumber || null,
        day_of_birth: args?.dateOfBirth || null,
        gender: args?.gender || null,
        user_name: args?.userName || null,
        password: args?.password || null,
        type_account: type_account || null,
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
  baseURL: "http://localhost:3000/api/v1/",

  // baseURL: "http://192.168.88.147:3000/api/v1/",

  // baseURL: "http://192.168.1.2:3000/api/v1/",

  // baseURL: "http://192.168.88.21:3000/api/v1/",
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
