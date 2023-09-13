import { AxiosInstance } from "@/services/api";

class ApiPersonal {
  onApiSaveInfoPersonal = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: "user-info",
      data: {
        user_id: `${args?.user_id}` || null,
        image:
          args?.avatar?.base64.split(":")[0] === "data"
            ? {
                name: `${args?.avatar?.name}`,
                base64: `${args?.avatar?.base64}`,
              }
            : undefined,
        full_name: `${args?.fullName}`,
        phone_number: `${args?.phoneNumber}`,
        day_of_birth: `${args?.dateOfBirth}`,
        gender: `${args?.gender}`,
      },
    });
  };

  // Api kho hàng
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

export const API_PERSONAL = new ApiPersonal();
