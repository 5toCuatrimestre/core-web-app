import React, { useContext } from "react";
import { StyleContext } from "../../core/StyleContext";
import { AreaChartAxisLabelsExample } from "./areaChartCallback";
import { BarChartLayoutExample } from "./BarChartLayoutExample";
import { BarChartGroupExample } from "./BarChartGroupExample";
import { BarChartOnValueChangeExample } from "./BarChartOnValueChangeExample";
export function Statistics() {
  const { style } = useContext(StyleContext);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Ventas Totales */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Ventas Totales</h2>
        <AreaChartAxisLabelsExample />
      </div>

      {/* Platillos Más y Menos Vendidos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Platillos Más y Menos Vendidos</h2>
        <BarChartLayoutExample />
      </div>

      {/* Ranking de Meseros */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Ranking de Meseros</h2>
        <BarChartGroupExample />
      </div>

      {/* Horarios de Mayor y Menor Venta */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Horarios de Mayor y Menor Venta</h2>
        <BarChartOnValueChangeExample />
      </div>
    </div>
  );
}