import apiClient from "./apiClient";

export const getTotalSales = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/sell/chart-data`, { params: { startDate, endDate } });
  return data;
};

export const getBestSellingDishes = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/sell/top-selling-products`, { params: { startDate, endDate } });
  return data;
};

export const getWaiterRanking = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/rating-user-sell/chart/waiter-ratings`, { params: { startDate, endDate } });
  return data;
};

export const getPeakHours = async (startDate, endDate) => {
  const { data } = await apiClient.get(`/sell/average-sales-by-hour`, { params: { startDate, endDate } });
  return data;
};
