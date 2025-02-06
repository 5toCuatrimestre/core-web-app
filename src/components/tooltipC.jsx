import { Tooltip } from "@heroui/react";

export function TooltipC({ children, content, showArrow, placement }) {
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