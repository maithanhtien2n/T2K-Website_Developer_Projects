import { isEmpty } from "@/utils";
import { ToastService } from "@/utils/toast";

export const Utils = () => {
  const TOAST = ToastService();

  const onResponse = async (value, showToast = false, messageToast) => {
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
          } else {
            throw res.statusValue;
          }
        })
        .catch((error) => {
          TOAST.error(error);
          throw new Error(error);
        });
    }
    return results;
  };

  return {
    TOAST,
    onResponse,
  };
};
