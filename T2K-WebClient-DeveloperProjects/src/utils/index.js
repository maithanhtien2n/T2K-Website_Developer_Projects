import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import router from "@/services/router";

const appLocalStorage = useStorage(
  "AppLocalStorage",
  {
    userData: {
      account_id: null,
      user_name: "",
      user_info: {
        user_id: null,
        account_id: null,
        vip: 0,
        image: "",
        full_name: "",
        phone_number: null,
        day_of_birth: "",
        gender: "",
        account_money: null,
        created_at: "",
        updated_at: "",
      },
    },
    accessToken: "",
  },
  localStorage,
  { mergeDefaults: true }
);

const vip = () => {
  switch (appLocalStorage.value?.userData?.user_info?.vip) {
    case "1":
      return 5;
    case "2":
      return 10;
    case "3":
      return 15;
    case "4":
      return 20;
    default:
      return appLocalStorage.value?.userData;
  }
};

const userData = computed(() => appLocalStorage.value?.userData);

const accessToken = computed(() => appLocalStorage.value?.accessToken);

const onDeleteAppLocalStorage = () => {
  appLocalStorage.value = {};

  router.replace({
    name: "Home",
  });
};

const isEmpty = (value) => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length) ||
    (!!value && value.constructor === Object && Object.keys(value).length === 0)
  );
};

const formatDate = (dateString, showTime = false) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return showTime ? `${formattedTime} ${formattedDate}` : formattedDate;
};

const formatToVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const onLoadingPage = (action) => {
  window.scrollTo(0, 0);
  setTimeout(() => action(false), 1000);
};

const onLoadingPageRepeat = (checkRouter, onLoadingActive, onNextRouter) => {
  if (checkRouter) {
    onLoadingActive(true);
    window.scrollTo(0, 0);
    onNextRouter;
    setTimeout(() => onLoadingActive(false), 1000);
  } else {
    onLoadingActive(true);
    onNextRouter;
  }
};

const onResponse = (resApi, toast) => {
  return resApi
    .then(({ data: res }) => {
      if (res.success) {
        return res;
      } else {
        throw res.statusValue;
      }
    })
    .catch((error) => {
      console.log(res);
      throw error;
    });
};

export {
  appLocalStorage,
  isEmpty,
  formatDate,
  formatToVND,
  onLoadingPage,
  onLoadingPageRepeat,
  onResponse,
  onDeleteAppLocalStorage,
  userData,
  accessToken,
  vip,
};
