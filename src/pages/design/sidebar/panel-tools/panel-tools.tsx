import { FC } from "react";

import SVG from "react-inlinesvg";

import { Tool, Wrapper } from "./panel-tools.styled";
import { PanelToolsProps } from "./panel-tools.types";

const PanelTools: FC<PanelToolsProps> = ({ tools }) => {
  return (
    <Wrapper>
      {tools.map(({ iconName, width = 25, height = 25, onClick }) => (
        <Tool key={iconName}>
          <SVG
            width={width}
            height={height}
            src={`/static/icons/${iconName}`}
            onClick={onClick}
          />
        </Tool>
      ))}
    </Wrapper>
  );
};

export default PanelTools;
