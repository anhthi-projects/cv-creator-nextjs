import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

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

  const tooltipRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<PositionProps>();
  const storedPosition = positionRef.current;

  useEffect(() => {
    const windowResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const tooltipWidth = tooltipRef.current?.clientWidth || 0;
      const tooltipHeight = tooltipRef.current?.clientHeight || 0;

      const totalTop = (storedPosition?.top || 0) - tooltipHeight - 8;
      const totalLeft = (storedPosition?.left || 0) - tooltipWidth / 2 - 6;

      console.log(tooltipHeight);

      setPosition({
        top: totalTop,
        left: totalLeft,
      });
    }
  }, [isOpen, storedPosition]);

  tooltip.open = ({ content, position }) => {
    setIsOpen(true);
    setContent(content);
    positionRef.current = position;
  };

  tooltip.close = () => {
    setIsOpen(false);
    setContent(null);
    setPosition(undefined);
  };

  return isOpen
    ? createPortal(
        <TooltipWrapper id={id} position={position} ref={tooltipRef}>
          {content}
        </TooltipWrapper>,
        document.body
      )
    : null;
};
