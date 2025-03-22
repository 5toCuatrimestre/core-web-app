"use client";

import React, { useEffect, useState } from "react";
import { AreaChart } from "../../components/AreaChart/AreaChart";
import { getTotalSales } from "../../api/chartsApi"; // Asegúrate de tener la función para consumir la API

export const AreaChartAxisLabelsExample = ({startDate, endDate}) => {
  console.log(startDate, endDate);
  const [chartData, setChartData] = useState([]); // Inicializamos el estado vacío

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTotalSales(startDate, endDate);
        
        // Usamos directamente data.result que ya contiene los datos en el formato adecuado
        setChartData(response.result); // Establecemos los datos recibidos directamente en el estado
      } catch (error) {
        console.error("Error al obtener los datos de ventas:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Solo se ejecuta una vez al montar el componente

  return (
    <AreaChart
      className="h-80"
      data={chartData} // Usamos los datos obtenidos del endpoint
      index="date"
      categories={["ventasTotales"]}
      valueFormatter={(number) =>
        `$${Intl.NumberFormat("us").format(number).toString()}`
      }
      xAxisLabel="Mes"
      yAxisLabel="Ventas Totales"
      fill="solid"
    />
  );
};
