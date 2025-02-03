import React, { useContext } from "react";
import { StyleContext } from "../../core/StyleContext";
import SessionsChart from "../../components/sessionChart";
import {Button} from "@heroui/button";

export function Statistics() {
  const { style } = useContext(StyleContext);
  return (
    <>
      <Button>Press me</Button>
    </>
  );
}
