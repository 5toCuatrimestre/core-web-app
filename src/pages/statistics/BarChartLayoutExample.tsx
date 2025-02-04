"use client"
import React from "react"
import { BarChart } from "../../components/BarChart/BarChart"

const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
]

export const BarChartLayoutExample = () => {
  return (
    <BarChart
      className="h-72"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      yAxisWidth={80}
      layout="vertical"
    />
  )
}