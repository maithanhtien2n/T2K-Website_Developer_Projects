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
    case 1:
      return 5;
    case 2:
      return 10;
    case 3:
      return 15;
    case 4:
      return 20;
    default:
      return 0;
  }
};

const userData = computed(() => appLocalStorage.value?.userData);

const accessToken = computed(() => appLocalStorage.value?.accessToken);

const onDeleteAppLocalStorage = () => {
  localStorage.removeItem("AppLocalStorage");

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

const stringWithoutAccents = (value) => {
  if (!value) return value;
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d");
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

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidName = (name) => {
  const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,}$/;
  return nameRegex.test(name);
};

const onLoadingPage = (action) => {
  window.scrollTo(0, 0);
  setTimeout(() => action(false), 300);
};

const onLoadingPageRepeat = (checkRouter, onLoadingActive, onNextRouter) => {
  if (checkRouter) {
    onLoadingActive(true);
    window.scrollTo(0, 0);
    onNextRouter;
    setTimeout(() => onLoadingActive(false), 300);
  } else {
    onLoadingActive(true);
    onNextRouter;
  }
};

const onRenderStringBase64 = (file) => {
  let fileBase64 = {};
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    fileBase64 = {
      fileName: file.name,
      contentBase64: event.target.result,
    };
  };
  return fileBase64;
};

export {
  appLocalStorage,
  isEmpty,
  formatDate,
  isValidName,
  formatToVND,
  onLoadingPage,
  isValidPhoneNumber,
  onLoadingPageRepeat,
  stringWithoutAccents,
  onRenderStringBase64,
  onDeleteAppLocalStorage,
  userData,
  accessToken,
  vip,
};
