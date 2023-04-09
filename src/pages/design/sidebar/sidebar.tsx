import { useMemo } from "react";

import PanelTools from "./panel-tools/panel-tools";
import { PanelTool } from "./panel-tools/panel-tools.types";
import { Wrapper } from "./sidebar.styled";
import puppeteer from "puppeteer";

const SideBar = () => {
  const editTools = useMemo<PanelTool[]>(
    () => [
      {
        iconName: "template.svg",
        width: 23,
        height: 23,
        onClick: () => {},
      },
      {
        iconName: "section.svg",
        width: 45,
        height: 45,
        onClick: () => {},
      },
      {
        iconName: "font-size.svg",
        width: 27,
        height: 27,
        onClick: () => {},
      },
      {
        iconName: "color.svg",
        width: 24,
        height: 24,
        onClick: () => {},
      },
    ],
    []
  );

  const progressTools = useMemo<PanelTool[]>(
    () => [
      {
        iconName: "save.svg",
        onClick: () => {},
      },
      {
        iconName: "download.svg",
        onClick: async () => {},
      },
    ],
    []
  );

  return (
    <Wrapper>
      <PanelTools tools={editTools} />
      <PanelTools tools={progressTools} />
    </Wrapper>
  );
};

export default SideBar;
