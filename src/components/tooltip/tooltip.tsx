import { FC, ReactNode, useState } from "react";

import { createPortal } from "react-dom";

import { useInOutsideClick } from "@src/hooks/useInOutsideClick";

import { TooltipWrapper } from "./tooltip.styled";
import { PositionProps, TooltipProps, TriggerTooltip } from "./tooltip.types";

export const tooltip: TriggerTooltip = {
  open: () => {},
  close: () => {},
};

export const Tooltip: FC<TooltipProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [position, setPosition] = useState<PositionProps>();

  const tooltipRef = useInOutsideClick<HTMLDivElement>({
    outsideCallback: () => {
      // setIsOpen(false);
    },
  });

  tooltip.open = ({ content, position }) => {
    setIsOpen(true);
    setContent(content);
    setPosition(position);
  };

  tooltip.close = () => {
    setIsOpen(false);
    setContent(null);
    setPosition(undefined);
  };

  return isOpen && position
    ? createPortal(
        <TooltipWrapper id={id} position={position} ref={tooltipRef}>
          {content}
        </TooltipWrapper>,
        document.body
      )
    : null;
};
