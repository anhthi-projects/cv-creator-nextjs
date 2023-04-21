import { useRouter } from "next/router";

import { ContentEditable } from "@src/components/content-editable";
import { Box, Flex } from "@src/components/layout";
import { Color, FontSize, FontWeight, Space } from "@src/styles/variables";

import AboutMe from "./about-me/about-me";
import Avatar from "./avatar/avatar";
import Contact from "./contact/contact";
import { LeftColumn, RightColumn, Wrapper } from "./cv-page.styled";
import Education from "./education/education";

const CvPage = () => {
  const { query } = useRouter();
  const isInPreview = query.mo === "preview";

  const renderNameAndPosition = () => {
    return (
      <>
        <ContentEditable
          content="Thi Nguyen Anh"
          placeholder="Your name"
          color={Color.Primary}
          fontSize={FontSize.Xl2}
          fontWeight={FontWeight.Bold}
          textAlign="center"
          noMargin
        />
        <ContentEditable
          content="Senior Developer"
          placeholder="Your position"
          color={Color.Light8}
          fontSize={FontSize.Lg}
          fontWeight={FontWeight.Bold}
          textAlign="center"
          noMargin
        />
      </>
    );
  };

  return (
    <Wrapper isInPreview={isInPreview}>
      <LeftColumn>
        <Avatar />
        {renderNameAndPosition()}
        <Box height={Space.px28} />
        <Contact />
        <AboutMe />
        <Education />
      </LeftColumn>
      <RightColumn>right</RightColumn>
    </Wrapper>
  );
};

export default CvPage;
