const appLocalStorage = () => {
  return JSON.parse(localStorage.getItem("AppLocalStorage"));
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

export { appLocalStorage, formatDate, formatToVND };
