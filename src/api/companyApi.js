import apiClient from "./apiClient";

export const getCompanyInfo = async () => {
  const { data } = await apiClient.get("/company/info");
  return data;
};

export const updateCompanyInfo = async (companyData) => {
  const { data } = await apiClient.put("/company/info", companyData);
  return data;
};
