"use client";

import React, { useEffect, useState } from "react";
import { BarChart } from "../../components/BarChart/BarChart";
import { getPeakHours } from "../../api/chartsApi";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartOnValueChangeExample = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPeakHours(startDate, endDate);
        setChartData(response.result);
      } catch (error) {
        console.error("Error al obtener ventas por hora:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <BarChart
      className="h-72"
      data={chartData}
      index="hour"
      categories={["ventas"]}
      valueFormatter={dataFormatter}
      yAxisWidth={45}
    />
  );
};
