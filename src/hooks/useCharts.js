import { useQuery } from "@tanstack/react-query";
import { getTotalSales, getBestSellingDishes, getWaiterRanking, getPeakHours } from "../api/chartsApi";

export const useTotalSales = (startDate, endDate) => 
  useQuery({ queryKey: ["totalSales", startDate, endDate], queryFn: () => getTotalSales(startDate, endDate) });

export const useBestSellingDishes = (startDate, endDate) => 
  useQuery({ queryKey: ["bestSellingDishes", startDate, endDate], queryFn: () => getBestSellingDishes(startDate, endDate) });

export const useWaiterRanking = (startDate, endDate) => 
  useQuery({ queryKey: ["waiterRanking", startDate, endDate], queryFn: () => getWaiterRanking(startDate, endDate) });

export const usePeakHours = (startDate, endDate) => 
  useQuery({ queryKey: ["peakHours", startDate, endDate], queryFn: () => getPeakHours(startDate, endDate) });
