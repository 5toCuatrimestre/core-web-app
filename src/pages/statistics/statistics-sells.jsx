import React, { useContext } from "react";
import { StyleContext } from '../../core/StyleContext';

export function StatisticsSells(){
    const { style } = useContext(StyleContext);
    return (
        <>
        <h1 style={{color:style.baseColor}} className="text-2xl">Estadisticas de ventas</h1>
        </>
    );
}