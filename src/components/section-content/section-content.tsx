import { FC } from "react";

import { Box } from "@src/components/layout";

import { ContentEditable } from "../content-editable";
import { SectionTitle } from "../section-title";

import { SectionContentProps } from "./section-content.types";

export const SectionContent: FC<SectionContentProps> = ({
  title,
  contents,
  ...boxProps
}) => {
  return (
    <Box {...boxProps}>
      <SectionTitle title={title} />
      {contents.map(({ key, content, placeholder, icon }) => (
        <ContentEditable
          key={key}
          content={content}
          placeholder={placeholder}
          icon={icon}
        />
      ))}
    </Box>
  );
};
