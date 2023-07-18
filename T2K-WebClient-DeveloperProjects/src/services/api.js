import axios from "axios";

// export * as API_PERSONAL from "@/views/personal/services/api";

class ApiApp {
  // onApiCreateNewPosts = async (args) => {
  //   return await AxiosInstance({
  //     method: "post",
  //     url: "posts",
  //     data: args,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // };
}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

updateAuthorizationHeader(
  JSON.parse(localStorage.getItem("AppLocalStorage"))?.accessToken
);

export { AxiosInstance, updateAuthorizationHeader };
