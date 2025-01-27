import React, { useContext } from "react";
import { StyleContext } from '../../core/StyleContext';

export function StatisticsWaiter(){
    const { style } = useContext(StyleContext);
    return (
        <>
        <h1 style={{color:style.baseColor}} className="text-2xl">Estadisticas de Meseros</h1>
        </>
    );
}