export interface PanelTool {
  iconName: string;
  width?: number;
  height?: number;
  onClick: () => void;
}

export interface PanelToolsProps {
  tools: PanelTool[];
}
