"use client";

import React, { useContext, useState } from "react";
import { StyleContext } from "../../core/StyleContext";
import { AreaChartAxisLabelsExample } from "./areaChartCallback";
import { BarChartLayoutExample } from "./BarChartLayoutExample";
import { BarChartGroupExample } from "./BarChartGroupExample";
import { BarChartOnValueChangeExample } from "./BarChartOnValueChangeExample";
import { DateRangePicker } from "@heroui/react";
import { LoadingSpinner } from "../../components/loadingSpinner";

export function Statistics() {
  const { style } = useContext(StyleContext);

  const getDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const formatDate = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };

    return [formatDate(thirtyDaysAgo), formatDate(thirtyDaysFromNow)];
  };

  const [rangeTotalSales, setRangeTotalSales] = useState(getDateRange());
  const handleChangeTotalSales = (range) => {
    if (range.start && range.end) {
      const start = `${range.start.year}-${String(range.start.month).padStart(2, "0")}-${String(range.start.day).padStart(2, "0")}`;
      const end = `${range.end.year}-${String(range.end.month).padStart(2, "0")}-${String(range.end.day).padStart(2, "0")}`;
      setRangeTotalSales([start, end]);
    }
  };

  // Platillos Más y Menos Vendidos
  const [rangeDishes, setRangeDishes] = useState(getDateRange());
  const handleChangeDishes = (range) => {
    if (range.start && range.end) {
      const start = `${range.start.year}-${String(range.start.month).padStart(2, "0")}-${String(range.start.day).padStart(2, "0")}`;
      const end = `${range.end.year}-${String(range.end.month).padStart(2, "0")}-${String(range.end.day).padStart(2, "0")}`;
      setRangeDishes([start, end]);
    }
  };

  // Ranking de Meseros
  const [rangeWaiters, setRangeWaiters] = useState(getDateRange());
  const handleChangeWaiters = (range) => {
    if (range.start && range.end) {
      const start = `${range.start.year}-${String(range.start.month).padStart(2, "0")}-${String(range.start.day).padStart(2, "0")}`;
      const end = `${range.end.year}-${String(range.end.month).padStart(2, "0")}-${String(range.end.day).padStart(2, "0")}`;
      setRangeWaiters([start, end]);
    }
  };

  // Horarios de Mayor y Menor Venta
  const [rangePeakHours, setRangePeakHours] = useState(getDateRange());
  const handleChangePeakHours = (range) => {
    if (range.start && range.end) {
      const start = `${range.start.year}-${String(range.start.month).padStart(2, "0")}-${String(range.start.day).padStart(2, "0")}`;
      const end = `${range.end.year}-${String(range.end.month).padStart(2, "0")}-${String(range.end.day).padStart(2, "0")}`;
      setRangePeakHours([start, end]);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Assuming you have a function to fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch data here
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error al cargar estadísticas</div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            {/* Ventas Totales */}
            <div className="p-6 rounded-lg shadow-md" style={{ background: style.BgCard }}>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
                  Ventas Totales
                </h1>
                <DateRangePicker
                  className="max-w-xs"
                  label="Rango de fecha"
                  value={rangeTotalSales}
                  onChange={handleChangeTotalSales}
                />
              </div>
              <AreaChartAxisLabelsExample startDate={rangeTotalSales[0]} endDate={rangeTotalSales[1]} />
            </div>

            {/* Platillos Más y Menos Vendidos */}
            <div className="p-6 rounded-lg shadow-md" style={{ background: style.BgCard }}>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
                  Platillos Más y Menos Vendidos
                </h1>
                <DateRangePicker
                  className="max-w-xs"
                  label="Rango de fecha"
                  value={rangeDishes}
                  onChange={handleChangeDishes}
                />
              </div>
              <BarChartLayoutExample startDate={rangeDishes[0]} endDate={rangeDishes[1]} />
            </div>

            {/* Ranking de Meseros */}
            <div className="p-6 rounded-lg shadow-md" style={{ background: style.BgCard }}>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
                  Ranking de Meseros
                </h1>
                <DateRangePicker
                  className="max-w-xs"
                  label="Rango de fecha"
                  value={rangeWaiters}
                  onChange={handleChangeWaiters}
                />
              </div>
              <BarChartGroupExample startDate={rangeWaiters[0]} endDate={rangeWaiters[1]} />
            </div>

            {/* Horarios de Mayor y Menor Venta */}
            <div className="p-6 rounded-lg shadow-md" style={{ background: style.BgCard }}>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
                  Horarios de Mayor y Menor Venta
                </h1>
                <DateRangePicker
                  className="max-w-xs"
                  label="Rango de fecha"
                  value={rangePeakHours}
                  onChange={handleChangePeakHours}
                />
              </div>
              <BarChartOnValueChangeExample startDate={rangePeakHours[0]} endDate={rangePeakHours[1]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
