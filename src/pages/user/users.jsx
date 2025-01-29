import React, { useContext } from "react";
import { StyleContext } from '../../core/StyleContext';
import FullFeaturedCrudGrid from "../../components/fullFeaturedCrudGrid";

export function Users(){
    const { style } = useContext(StyleContext);
    return (
        <>
        <h1 style={{color:style.baseColor}} className="text-2xl">Usuarios</h1>
        <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
        </>
    );
}