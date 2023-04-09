import { FC } from "react";

import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { Box } from "../layout";

import { Title } from "./section.styled";
import { SectionProps } from "./section.types";

const Section: FC<SectionProps> = ({ title, content, ...restProps }) => {
  return (
    <Box {...restProps}>
      <Title
        text={title}
        placeholder={title}
        color={Color.Light10}
        fontSize={FontSize.Lg}
        fontWeight={FontWeight.SemiBold}
        textAlign="center"
      />
      {content}
    </Box>
  );
};

export default Section;
