import { FC, forwardRef } from "react";

import SVG from "react-inlinesvg";

import { getIconPath } from "@src/utils/helpers";

import { Divider, FormatBarWrapper, FormatItem } from "./format-bar.styled";
import { FormatBarProps } from "./format-bar.types";

const FormatTextBar = forwardRef<HTMLDivElement, FormatBarProps>(function a(
  props,
  ref
) {
  const { onBold, onItalic, onUnderline } = props;

  return (
    <FormatBarWrapper ref={ref}>
      <FormatItem onClick={onBold}>
        <SVG src={getIconPath("bold.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem onClick={onItalic}>
        <SVG src={getIconPath("italic.svg")} width={14} height={14} />
      </FormatItem>
      <FormatItem onClick={onUnderline}>
        <SVG src={getIconPath("underline.svg")} width={15} height={15} />
      </FormatItem>
      <Divider />
      <FormatItem onClick={onUnderline}>
        <SVG src={getIconPath("link.svg")} width={15} height={15} />
      </FormatItem>
    </FormatBarWrapper>
  );
});

export default FormatTextBar;
