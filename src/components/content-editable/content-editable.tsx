import { useEffect, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { SelectionType, StyleTagName } from "@src/common/constants";
import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { getIconPath } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import {
  Content,
  NotSupportSelectionType,
  Wrapper,
} from "./content-editable.styled";
import {
  ContentEditableProps,
  ContentNodeProps,
} from "./content-editable.types";
import {
  getSelectionType,
  contentNodesToString,
  formatSelection,
  stringToContentNodes,
} from "./content-editable.utils";
import FormatBar from "./format-bar/format-bar";

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

  const [contentNodes, setContentNodes] = useState<ContentNodeProps[]>([]);

  useEffect(() => {
    setContentNodes(stringToContentNodes(content));
  }, [content]);

  const handleStyleClick = (tagName: string) => {
    const newContentNodes = formatSelection({
      tagName,
      originContentNodes: contentNodes,
    });

    setContentNodes(newContentNodes);
    tooltip.close();
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    if (!selection || selection?.toString() === "" || !rangeRect) {
      return;
    }

    const selectionType = getSelectionType(selection);

    console.log(selection);
    console.log(selectionType);

    tooltip.open({
      content:
        selectionType === SelectionType.Invalid ? (
          <NotSupportSelectionType>
            This selection is not supported
          </NotSupportSelectionType>
        ) : (
          <FormatBar
            selection={selection}
            onBold={() => handleStyleClick(StyleTagName.Bold)}
            onItalic={() => handleStyleClick(StyleTagName.Italic)}
            onUnderline={() => handleStyleClick(StyleTagName.Underline)}
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
