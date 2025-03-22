import React, { useContext, useState } from "react";
import { StyleContext } from "../../core/StyleContext";
import { AreaChartAxisLabelsExample } from "./areaChartCallback";
import { BarChartLayoutExample } from "./BarChartLayoutExample";
import { BarChartGroupExample } from "./BarChartGroupExample";
import { BarChartOnValueChangeExample } from "./BarChartOnValueChangeExample";
import { DateRangePicker } from "@heroui/react";
export function Statistics() {
  const { style } = useContext(StyleContext);
  const [selectedRange, setSelectedRange] = useState(["2025-01-22", "2025-03-22"]);
  console.log("Rango de fechas default", selectedRange[0], selectedRange[1]);
  const handleDateChange = (range) => {
    // Extraemos la fecha en formato YYYY-MM-DD a partir de las propiedades start y end
    if (range.start && range.end) {
      const startDate = `${range.start.year}-${String(range.start.month).padStart(2, '0')}-${String(range.start.day).padStart(2, '0')}`;
      const endDate = `${range.end.year}-${String(range.end.month).padStart(2, '0')}-${String(range.end.day).padStart(2, '0')}`;
  
      setSelectedRange([startDate, endDate]); // Actualiza el estado con el nuevo rango de fechas
      console.log("Rango de fechas seleccionado:", startDate, endDate); // Muestra el rango de fechas en el formato deseado

    }
  };
  

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Ventas Totales */}
      <div
        className="p-6 rounded-lg shadow-md"
        style={{ background: style.BgCard }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
            Ventas Totales
          </h1>
          <DateRangePicker className="max-w-xs" label="Rango de fecha" value={selectedRange} onChange={handleDateChange}/>
        </div>
        <AreaChartAxisLabelsExample startDate={selectedRange[0]} endDate={selectedRange[1]}/>
      </div>

      {/* Platillos Más y Menos Vendidos */}
      <div
        className="p-6 rounded-lg shadow-md"
        style={{ background: style.BgCard }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
            Platillos Más y Menos Vendidos
          </h1>
          <DateRangePicker className="max-w-xs" label="Rango de fecha" />
        </div>

        <BarChartLayoutExample />
      </div>

      {/* Ranking de Meseros */}
      <div
        className="p-6 rounded-lg shadow-md"
        style={{ background: style.BgCard }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
            Ranking de Meseros
          </h1>
          <DateRangePicker className="max-w-xs" label="Rango de fecha" />
        </div>

        <BarChartGroupExample />
      </div>

      {/* Horarios de Mayor y Menor Venta */}
      <div
        className="p-6 rounded-lg shadow-md"
        style={{ background: style.BgCard }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
            Horarios de Mayor y Menor Venta
          </h1>
          <DateRangePicker className="max-w-xs" label="Rango de fecha"/>
        </div>

        <BarChartOnValueChangeExample />
      </div>
    </div>
  );
}
