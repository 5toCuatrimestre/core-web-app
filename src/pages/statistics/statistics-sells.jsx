import React, { useContext } from "react";
import { StyleContext } from '../../core/StyleContext';
import Button from '@mui/material/Button';
import SessionsChart from "../../components/sessionChart";

export function StatisticsSells(){
    const { style } = useContext(StyleContext);
    return (
        <>
        <SessionsChart></SessionsChart>
        </>
    );
}