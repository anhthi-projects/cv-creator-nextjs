import { FC } from "react";

import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { Title } from "./section-title.styled";
import { SectionTitleProps } from "./section-title.types";

export const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <Title
      text={title}
      placeholder={title}
      color={Color.Light10}
      fontSize={FontSize.Lg}
      fontWeight={FontWeight.SemiBold}
      textAlign="center"
    />
  );
};
