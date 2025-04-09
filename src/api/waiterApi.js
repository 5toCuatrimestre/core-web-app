import apiClient from "./apiClient";

export const getTicket = async (ticketId) => {
  const { data } = await apiClient.get(`/sell/ticket/${ticketId}`);
  return data;
};

export const rateWaiter = async (sellId, stars) => {
  const { data } = await apiClient.post(`/rating-user-sell`, {
    sellId: Number(sellId),
    stars: Number(stars),
    comment: "Great service!",
    createdAt: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
  });
  return data;
};
