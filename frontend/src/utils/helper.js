import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const getInitials = (name) => {
  if (!name) return;

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/, ",");

  return fractionalPart
    ? `${fractionalPart}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    category: item?.category || "Unknown",
    amount: item?.amount ?? 0,
  }));
};

export const prepareIncomeBarChartData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount ?? 0, 
    source: item?.source || "", 
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount ?? 0, 
    category: item?.category || "Unknown", 
  }));

  return chartData;
};
