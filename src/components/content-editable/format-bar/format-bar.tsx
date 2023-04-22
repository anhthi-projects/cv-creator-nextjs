import { FC } from "react";

import SVG from "react-inlinesvg";

import { StyleTagName } from "@src/common/constants";
import { getIconPath } from "@src/utils/helpers";

import {
  ColorIconLabel,
  ColorPickerInput,
  Divider,
  FormatBarWrapper,
  FormatItem,
} from "./format-bar.styled";
import { FormatBarProps } from "./format-bar.types";

const FormatTextBar: FC<FormatBarProps> = ({
  selection: { anchorNode, focusNode },
  onBold,
  onItalic,
  onUnderline,
}) => {
  const checkStyleActivated = (tagName: string) => {
    const anchorParentElement = anchorNode?.parentElement as HTMLElement;
    const focusParentElement = focusNode?.parentElement as HTMLElement;
    const isSelectInSameElement = anchorParentElement === focusParentElement;

    return (
      isSelectInSameElement &&
      anchorParentElement.tagName.toLowerCase() === tagName
    );
  };

  return (
    <FormatBarWrapper>
      <FormatItem
        isActive={checkStyleActivated(StyleTagName.Bold)}
        onClick={onBold}
      >
        <SVG src={getIconPath("bold.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem
        isActive={checkStyleActivated(StyleTagName.Italic)}
        onClick={onItalic}
      >
        <SVG src={getIconPath("italic.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem
        isActive={checkStyleActivated(StyleTagName.Underline)}
        onClick={onUnderline}
      >
        <SVG src={getIconPath("underline.svg")} width={15} height={15} />
      </FormatItem>
      <Divider />
      <FormatItem onClick={onUnderline}>
        <SVG src={getIconPath("link.svg")} width={15} height={15} />
      </FormatItem>
      <FormatItem>
        <ColorPickerInput type="color" id="text-color-picker" />
        <ColorIconLabel htmlFor="text-color-picker">
          <SVG
            src={getIconPath("text-color-picker.svg")}
            width={24}
            height={24}
          />
        </ColorIconLabel>
      </FormatItem>
    </FormatBarWrapper>
  );
};

export default FormatTextBar;
