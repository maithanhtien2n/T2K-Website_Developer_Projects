import { AxiosInstance } from "@/services/api";

class ApiApp {
  onApiGetWarehouses = async () => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          success: true,
          statusValue: "Lưu dữ liệu thành công!",
          data: [
            {
              image:
                "https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg",
              code: "YZ01234",
              productName: "Khóa học PHP mới nhất 2023",
              price: 300000,
            },
            {
              image:
                "https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg",
              code: "YZ01234",
              productName: "Khóa học PHP mới nhất 2023",
              price: 200000,
            },
            {
              image:
                "https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg",
              code: "YZ01234",
              productName: "Khóa học PHP mới nhất 2023",
              price: 250000,
            },
            {
              image:
                "https://anime.atsit.in/l/wp-content/uploads/2022/09/khi-nao-goku-len-super-saiyan-blue.jpg",
              code: "YZ01234",
              productName: "Khóa học PHP mới nhất 2023",
              price: 200000,
            },
          ],
        },
      });
    });
  };
}

export const API_WAREHOUSE = new ApiApp();
