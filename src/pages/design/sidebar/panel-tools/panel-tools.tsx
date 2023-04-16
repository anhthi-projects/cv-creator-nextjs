import { FC } from "react";

import SVG from "react-inlinesvg";

import { getIconPath } from "@src/utils/helpers";

import { ToolItem, PanelWrapper } from "./panel-tools.styled";
import { PanelToolsProps } from "./panel-tools.types";

const PanelTools: FC<PanelToolsProps> = ({ tools }) => {
  return (
    <PanelWrapper>
      {tools.map(({ iconName, width = 25, height = 25, onClick }) => (
        <ToolItem key={iconName}>
          <SVG
            width={width}
            height={height}
            src={getIconPath(iconName)}
            onClick={onClick}
          />
        </ToolItem>
      ))}
    </PanelWrapper>
  );
};

export default PanelTools;
