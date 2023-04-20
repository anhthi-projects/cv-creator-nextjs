import { useEffect, useRef, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import { Content, Wrapper } from "./content-editable.styled";
import {
  ContentEditableProps,
  ContentTokenProps,
} from "./content-editable.types";
import {
  contentTokensToString,
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

  const [contentTokens, setContentTokens] = useState<ContentTokenProps[]>([
    {
      text: "hello",
      tags: [
        {
          tagName: "strong",
        },
      ],
      startAt: 0,
      endAt: 0,
    },
    {
      text: content || "",
      startAt: 0,
      endAt: content?.length || 0,
    },
    {
      text: "world",
      tags: [
        {
          tagName: "em",
        },
      ],
      startAt: 0,
      endAt: 0,
    },
  ]);
  const formatTextBarRef = useRef<HTMLDivElement>(null);

  /**
   * Style actions
   */

  const handleBold = () => {
    formatSelection({
      tagName: "strong",
      originContentToken: contentTokens,
    });
    tooltip.close();
  };

  const handleItalic = () => {};

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
        {HTMLReactParser(contentTokensToString(contentTokens))}
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
