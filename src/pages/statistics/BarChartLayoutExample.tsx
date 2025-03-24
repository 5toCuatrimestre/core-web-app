"use client";

import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/BarChart/BarChart";
import { getBestSellingDishes } from "../../api/chartsApi";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartLayoutExample = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBestSellingDishes(startDate, endDate);
        // Aseguramos que las claves estén en minúscula como espera el componente
        const normalizedData = response.result.map(item => ({
          name: item.name,
          ventas: item.ventas, // aseguramos que se llame ventas
        }));
        setChartData(normalizedData);
      } catch (error) {
        console.error("Error al obtener los platillos más vendidos:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <BarChart
      className="h-72"
      data={chartData}
      index="name"
      categories={["ventas"]}
      yAxisWidth={80}
      layout="vertical"
    />
  );
};