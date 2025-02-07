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
      <div className="p-6 rounded-lg shadow-md" style={{background:style.BgCard}}>
        <h1 className="text-xl font-bold mb-4" style={{color:style.H1}}>Ventas Totales</h1>
        <AreaChartAxisLabelsExample />
      </div>

      {/* Platillos Más y Menos Vendidos */}
      <div className="p-6 rounded-lg shadow-md" style={{background:style.BgCard}}>
        <h1 className="text-xl font-bold mb-4" style={{color:style.H1}}>Platillos Más y Menos Vendidos</h1>
        <BarChartLayoutExample />
      </div>

      {/* Ranking de Meseros */}
      <div className="p-6 rounded-lg shadow-md" style={{background:style.BgCard}}>
        <h1 className="text-xl font-bold mb-4" style={{color:style.H1}}>Ranking de Meseros</h1>
        <BarChartGroupExample />
      </div>

      {/* Horarios de Mayor y Menor Venta */}
      <div className="p-6 rounded-lg shadow-md" style={{background:style.BgCard}}>
        <h1 className="text-xl font-bold mb-4" style={{color:style.H1}}>Horarios de Mayor y Menor Venta</h1>
        <BarChartOnValueChangeExample />
      </div>
    </div>
  );
}