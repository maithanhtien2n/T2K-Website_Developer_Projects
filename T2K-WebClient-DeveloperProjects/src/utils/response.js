import { ToastService } from "@/utils/toast";
import { isEmpty } from "@/utils";

export const onResponse = async (value, showToast = false, messageToast) => {
  const TOAST = ToastService();
  let results = [];
  if (!isEmpty(value)) {
    await value
      .then(({ data: res }) => {
        if (res.success) {
          if (!showToast) {
            results = res;
          } else {
            results = res;
            TOAST.success(messageToast ? messageToast : res.statusValue);
          }
        }
      })
      .catch((error) => {
        TOAST.error(error);
        throw new Error(error);
      });
  }
  return results;
};
