import React, { useContext } from "react";
import { StyleContext } from '../../core/StyleContext';
import BarAnimation from "../../components/barAnimation";
import PaginationOutlined from "../../components/paginationOutlined";

export function StatisticsService(){
    const { style } = useContext(StyleContext);
    return (
        <>
        <h1 style={{color:style.baseColor}} className="text-2xl">Estadísticas de Servicio</h1>
        <BarAnimation></BarAnimation>
        </>
    );
}