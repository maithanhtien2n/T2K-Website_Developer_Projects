const appLocalStorage = () => {
  return {
    userInfo: JSON.parse(localStorage.getItem("AppLocalStorage")),
    token: JSON.parse(localStorage.getItem("TOKEN")),
  };
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

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

const formatToVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const onLoadingPage = (action) => {
  window.scrollTo(0, 0);
  setTimeout(() => action(false), 500);
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
};
