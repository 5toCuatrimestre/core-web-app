"use client"

import React from "react"
import { BarChart, type BarChartEventProps } from "../../components/BarChart/BarChart"

const chartdata = [
  { hour: "08:00", ventas: 120 },
  { hour: "09:00", ventas: 150 },
  { hour: "10:00", ventas: 200 },
  { hour: "11:00", ventas: 250 },
  { hour: "12:00", ventas: 300 },
  { hour: "13:00", ventas: 500 },
  { hour: "14:00", ventas: 700 },
  { hour: "15:00", ventas: 650 },
  { hour: "16:00", ventas: 600 },
  { hour: "17:00", ventas: 750 },
  { hour: "18:00", ventas: 800 },
  { hour: "19:00", ventas: 850 },
  { hour: "20:00", ventas: 900 },
  { hour: "21:00", ventas: 950 },
  { hour: "22:00", ventas: 700 },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartOnValueChangeExample = () => {
  return (
    <BarChart
      className="h-72"
      data={chartdata}
      index="hour"
      categories={["ventas"]}
      valueFormatter={dataFormatter}
      yAxisWidth={45}
    />
  );
};
