import { ReactNode } from "react";

export interface PositionProps {
  top: number;
  left: number;
}

export interface OpenProps {
  content: ReactNode;
  position: PositionProps;
}

export interface TriggerTooltip {
  open: (props: OpenProps) => void;
  close: () => void;
}

export interface TooltipProps {
  id: string;
}
