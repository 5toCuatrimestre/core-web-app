"use client"

import React from "react";
import { BarChart } from "../../components/BarChart/BarChart";

const chartdata = [
  {
    name: "Líder Juan",
    "Mesero A": 890,
    "Mesero B": 338,
    "Mesero C": 538,
  },
  {
    name: "Líder María",
    "Mesero D": 396,
    "Mesero E": 138,
    "Mesero F": 436,
  },
  {
    name: "Líder Pedro",
    "Mesero G": 289,
    "Mesero H": 233,
    "Mesero I": 253,
  },
  {
    name: "Líder Ana",
    "Mesero J": 333,
    "Mesero K": 133,
    "Mesero L": 533,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartGroupExample = () => {
  return (
    <BarChart
      className="h-72"
      data={chartdata}
      index="name"
      categories={["Mesero A", "Mesero B", "Mesero C", "Mesero D", "Mesero E", "Mesero F", "Mesero G", "Mesero H", "Mesero I", "Mesero J", "Mesero K", "Mesero L"]}
      valueFormatter={dataFormatter}
      yAxisWidth={80}
      layout="horizontal"
    />
  );
};