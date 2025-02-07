import React, { useContext } from "react";
import { Tooltip } from "@heroui/react";
import { StyleContext } from "../core/StyleContext";

export function TooltipC({ children, content, showArrow, placement }) {
  const { style } = useContext(StyleContext);
  return (
    <Tooltip
      color="default"
      content={content}
      showArrow={showArrow}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}