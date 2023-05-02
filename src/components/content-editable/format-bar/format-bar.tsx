import { FC } from "react";

import SVG from "react-inlinesvg";

import { TagName } from "@src/common/types";
import { getIconPath } from "@src/utils/helpers";

import {
  ColorIconLabel,
  ColorPickerInput,
  Divider,
  FormatBarWrapper,
  FormatItem,
} from "./format-bar.styled";
import { FormatBarProps } from "./format-bar.types";
import { checkStyleActivated } from "./format-bar.utils";

const FormatTextBar: FC<FormatBarProps> = ({
  selection,
  onBold,
  onItalic,
  onUnderline,
}) => {
  const isBoldActivated = checkStyleActivated(TagName.Bold, selection);
  const isItalicActivated = checkStyleActivated(TagName.Italic, selection);
  const isUnderlineActivated = checkStyleActivated(
    TagName.Underline,
    selection
  );

  return (
    <FormatBarWrapper>
      <FormatItem isActive={isBoldActivated} onClick={onBold}>
        <SVG src={getIconPath("bold.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem isActive={isItalicActivated} onClick={onItalic}>
        <SVG src={getIconPath("italic.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem isActive={isUnderlineActivated} onClick={onUnderline}>
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
