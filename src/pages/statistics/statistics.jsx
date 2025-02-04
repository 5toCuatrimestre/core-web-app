import React, { useContext } from "react";
import { StyleContext } from "../../core/StyleContext";
import {Button} from "@heroui/button";
import { BarChart6 } from "../../components/barChart";

export function Statistics() {
  const { style } = useContext(StyleContext);
  return (
    <>
      <Button>Press me</Button>
      <BarChart6></BarChart6>
    </>
  );
}
