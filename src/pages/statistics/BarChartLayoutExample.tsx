"use client"

import React from "react"
import { BarChart } from "../../components/BarChart/BarChart"

const chartdata = [
  {
    name: "Tacos al Pastor",
    Ventas: 2488,
  },
  {
    name: "Hamburguesa",
    Ventas: 1445,
  },
  {
    name: "Pizza Pepperoni",
    Ventas: 743,
  },
  {
    name: "Sushi Roll",
    Ventas: 281,
  },
  {
    name: "Ensalada César",
    Ventas: 251,
  },
  {
    name: "Hot Dog",
    Ventas: 232,
  },
  {
    name: "Pasta Alfredo",
    Ventas: 98,
  },
]

export const BarChartLayoutExample = () => {
  return (
    <BarChart
      className="h-72"
      data={chartdata}
      index="name"
      categories={["Ventas"]}
      yAxisWidth={80}
      layout="vertical"
    />
  )
}