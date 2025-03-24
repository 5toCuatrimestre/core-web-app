"use client";

import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/BarChart/BarChart";
import { getWaiterRanking } from "../../api/chartsApi";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartGroupExample = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState<Record<string, number>[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWaiterRanking(startDate, endDate);
        // Extraemos el objeto de data enviado desde el backend
        // Ejemplo: { "Mesero A": 890, "Mesero B": 338, ... }
        const result = response.result[0].data;
        // Convertimos a array con un solo objeto, igual que en la versión estática
        const formattedData = [result];
        // Las categorías serán las claves del objeto
        const keys = Object.keys(result);

        setChartData(formattedData);
        setCategories(keys);
      } catch (error) {
        console.error("Error al obtener ranking de meseros:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <BarChart
      className="h-72"
      data={chartData}
      index="name" // Se mantiene igual que en la versión estática, aunque la propiedad "name" no exista en el objeto
      categories={categories}
      valueFormatter={dataFormatter}
      yAxisWidth={80}
      layout="horizontal"
    />
  );
};
