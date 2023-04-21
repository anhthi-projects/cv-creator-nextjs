import { useEffect, useRef, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { StyleTagName } from "@src/common/constants";
import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import {
  ContentEditableProps,
  ContentNodeProps,
} from "./content-editable.types";
import {
  contentNodesToString,
  formatSelection,
} from "./content-editable.utils";
import FormatTextBar from "./format-bar/format-bar";

export const ContentEditable = (props: ContentEditableProps) => {
  const {
    content,
    icon,
    placeholder = "Empty",
    color = Color.Light7,
    fontSize = FontSize.Md,
    fontWeight = FontWeight.Normal,
    textAlign = "left",
    className,
    noMargin,
  } = props;

  const [contentNodes, setContentNodes] = useState<ContentNodeProps[]>([
    {
      text: "hello ",
    },
    {
      text: " world ",
      tags: [
        {
          tagName: "strong",
        },
      ],
    },
    {
      text: content || "",
    },
    {
      text: " end",
      tags: [
        {
          tagName: "em",
        },
      ],
    },
  ]);
  const formatTextBarRef = useRef<HTMLDivElement>(null);

  /**
   * Style actions
   */

  const handleBold = () => {
    const newContentNodes = formatSelection({
      tagName: StyleTagName.Bold,
      originContentNodes: contentNodes,
    });

    setContentNodes(newContentNodes);
    tooltip.close();
  };

  const handleItalic = () => {
    const newContentNodes = formatSelection({
      tagName: "em",
      originContentNodes: contentNodes,
    });

    setContentNodes(newContentNodes);
    tooltip.close();
  };

  const handleUnderline = () => {};

  /**
   * Text selection
   */

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    if (!selection || selection?.toString() === "" || !rangeRect) {
      return;
    }

    console.log(selection);

    tooltip.open({
      content: (
        <FormatTextBar
          selection={selection}
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          ref={formatTextBarRef}
        />
      ),
      position: {
        top: window.scrollY + rangeRect.top,
        left: rangeRect.right,
      },
    });
  };

  /**
   * Render
   */

  const renderContent = () => {
    return (
      <Content
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        placeholder={placeholder}
        className={className}
        noMargin={noMargin}
        suppressContentEditableWarning
        contentEditable
        onSelect={handleTextSelection}
      >
        {HTMLReactParser(contentNodesToString(contentNodes))}
      </Content>
    );
  };

  if (icon) {
    return (
      <Wrapper>
        <SVG
          src={getIconPath(icon.iconName)}
          width={icon.width || 22}
          height={icon.height || 22}
        />
        {renderContent()}
      </Wrapper>
    );
  }
  return renderContent();
};
