import { useMemo } from "react";

import { useRouter } from "next/router";

import PanelTools from "./panel-tools/panel-tools";
import { PanelTool } from "./panel-tools/panel-tools.types";
import { Wrapper } from "./sidebar.styled";

const SideBar = () => {
  const { query } = useRouter();
  const isInPreview = query.mo === "preview";

  const editTools = useMemo<PanelTool[]>(
    () => [
      {
        iconName: "template.svg",
        width: 22,
        height: 22,
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
        iconName: "theme-color-picker.svg",
        width: 23,
        height: 23,
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
        iconName: "preview.svg",
        width: 24,
        height: 24,
        onClick: async () => {},
      },
      {
        iconName: "download.svg",
        onClick: async () => {},
      },
    ],
    []
  );

  /**
   * Render
   */

  if (isInPreview) {
    return null;
  }

  return (
    <Wrapper>
      <PanelTools tools={editTools} />
      <PanelTools tools={progressTools} />
    </Wrapper>
  );
};

export default SideBar;
