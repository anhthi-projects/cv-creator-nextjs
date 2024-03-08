import { useEffect, useState } from "react";

import HTMLReactParser from "html-react-parser";
import SVG from "react-inlinesvg";

import { NodeProps, SelectionType, TagName } from "@src/common/types";
import { Color, FontSize, FontWeight } from "@src/styles/variables";
import { nodesToString, stringToNodes } from "@src/utils/dom";
import { getIconPath, toSnakeCase } from "@src/utils/helpers";

import { tooltip } from "../tooltip";

import {
  Content,
  NotSupportSelectionType,
  IconWrapper,
} from "./content-editable.styled";
import { ContentEditableProps } from "./content-editable.types";
import { getSelectionType, formatSelection } from "./content-editable.utils";
import FormatBar from "./format-bar/format-bar";

export const ContentEditable = (props: ContentEditableProps) => {
  const {
    name,
    icon,
    content,
    placeholder = "Empty",
    color = Color.Light7,
    fontSize = FontSize.Md,
    fontWeight = FontWeight.Normal,
    textAlign = "left",
    className,
    noMargin,
  } = props;

  const [nodes, setNodes] = useState<NodeProps[]>([]);

  useEffect(() => {
    const updatedNodes = stringToNodes(content);
    setNodes(updatedNodes);
  }, [content]);

  const applyStyle = (tagName: string) => {
    const newNodes = formatSelection({
      tagName,
      originNodes: nodes,
    });

    setNodes(newNodes);
    tooltip.close();
  };

  const selectText = () => {
    const selection = window.getSelection();
    const rangeRect = selection?.getRangeAt(0).getBoundingClientRect();

    if (!selection || selection?.toString() === "" || !rangeRect) {
      return;
    }

    const selectionType = getSelectionType({
      selection,
      nodes,
    });
    const tooltipContent =
      selectionType === SelectionType.Invalid ? (
        <NotSupportSelectionType>
          This selection is not supported
        </NotSupportSelectionType>
      ) : (
        <FormatBar
          selection={selection}
          onBold={() => applyStyle(TagName.Bold)}
          onItalic={() => applyStyle(TagName.Italic)}
          onUnderline={() => applyStyle(TagName.Underline)}
        />
      );

    console.log(selection);

    tooltip.open({
      content: tooltipContent,
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
        onSelect={selectText}
      >
        {HTMLReactParser(
          nodesToString({
            name: toSnakeCase(name),
            nodes,
          })
        )}
      </Content>
    );
  };

  if (icon) {
    return (
      <IconWrapper>
        <SVG
          src={getIconPath(icon.iconName)}
          width={icon.width || 22}
          height={icon.height || 22}
        />
        {renderContent()}
      </IconWrapper>
    );
  }

  return renderContent();
};
