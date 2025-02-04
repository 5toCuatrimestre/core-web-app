"use client"

import React from "react"
import { BarChart, type BarChartEventProps } from "../../components/BarChart/BarChart"

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

export const BarChartOnValueChangeExample = () => {
  const [value, setValue] = React.useState<BarChartEventProps>(null)
  return (
    <>
      <BarChart
        className="h-72"
        data={chartdata}
        index="name"
        categories={["Number of threatened species"]}
        yAxisWidth={45}
        onValueChange={(v) => setValue(v)}
      />
      {/* <pre className="mt-8 rounded-md bg-gray-950 p-3 text-sm text-white dark:bg-gray-800 ">
        {JSON.stringify(value, null, 2)}
      </pre> */}
    </>
  )
}