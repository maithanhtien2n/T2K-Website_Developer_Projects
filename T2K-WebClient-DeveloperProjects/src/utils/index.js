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

export { appLocalStorage, formatDate };
