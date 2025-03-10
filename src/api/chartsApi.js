import apiClient from "./apiClient";

export const getTotalSales = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/charts/total-sales`, { params: { startDate, endDate } });
  return data;
};

export const getBestSellingDishes = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/charts/best-selling-dishes`, { params: { startDate, endDate } });
  return data;
};

export const getWaiterRanking = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/charts/waiter-ranking`, { params: { startDate, endDate } });
  return data;
};

export const getPeakHours = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/charts/peak-hours`, { params: { startDate, endDate } });
  return data;
};
