"use client";

import React from "react";
import { AreaChart } from "../../components/AreaChart/AreaChart";

const chartdata = [
  {
    date: "Ene 24",
    VentasTotales: 12890,
  },
  {
    date: "Feb 24",
    VentasTotales: 11256,
  },
  {
    date: "Mar 24",
    VentasTotales: 14322,
  },
  {
    date: "Abr 24",
    VentasTotales: 15470,
  },
  {
    date: "May 24",
    VentasTotales: 13475,
  },
  {
    date: "Jun 24",
    VentasTotales: 13129,
  },
  {
    date: "Jul 24",
    VentasTotales: 16490,
  },
  {
    date: "Ago 24",
    VentasTotales: 14903,
  },
  {
    date: "Sep 24",
    VentasTotales: 15643,
  },
  {
    date: "Oct 24",
    VentasTotales: 14837,
  },
  {
    date: "Nov 24",
    VentasTotales: 14954,
  },
  {
    date: "Dic 24",
    VentasTotales: 25249,
  },
];

export const AreaChartAxisLabelsExample= () => (
  <AreaChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["VentasTotales"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    xAxisLabel="Mes"
    yAxisLabel="Ventas Totales"
    fill="solid"
  />
);
