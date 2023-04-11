import { FC } from "react";

import SVG from "react-inlinesvg";

import { Flex } from "../layout";

import { StyledContentEditable } from "./content-editable-enhance.styled";
import { ContentEditableEnhanceProps } from "./content-editable-enhance.types";

const ContentEditableEnhance: FC<ContentEditableEnhanceProps> = ({
  icon,
  ...restProps
}) => {
  const renderIcon = () => {
    if (!icon) {
      return;
    }

    return (
      <SVG
        src={`/static/icons/${icon.iconName}`}
        width={icon.width || 22}
        height={icon.height || 22}
      />
    );
  };

  return (
    <Flex alignItems="center">
      {renderIcon()}
      <StyledContentEditable {...restProps} />
    </Flex>
  );
};

export default ContentEditableEnhance;
