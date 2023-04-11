import { useRouter } from "next/router";

import ContentEditable from "@src/components/content-editable/content-editable";
import ContentEditableEnhance from "@src/components/content-editable-enhance/content-editable-enhance";
import { Box, Flex } from "@src/components/layout";
import Section from "@src/components/section/section";
import {
  Color,
  FontSize,
  FontWeight,
  Page,
  Space,
} from "@src/styles/variables";

import AboutMe from "./about-me/about-me";
import Avatar from "./avatar/avatar";
import Contact from "./contact/contact";
import { LeftColumn, RightColumn, Wrapper } from "./cv-page.styled";

const CvPage = () => {
  const { query } = useRouter();
  const isInPreview = query.mo === "preview";

  const renderNameAndPosition = () => {
    return (
      <>
        <ContentEditable
          text="Thi Nguyen Anh"
          placeholder="Your name"
          color={Color.Primary}
          fontSize={FontSize.Xl2}
          fontWeight={FontWeight.Bold}
          textAlign="center"
          noMargin
        />
        <ContentEditable
          text="Senior Developer"
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
      <Flex>
        <LeftColumn>
          <Avatar />
          {renderNameAndPosition()}
          <Box height={Space.px28} />
          <Contact />
          <AboutMe />
        </LeftColumn>
        <RightColumn>
          <Section
            title="Working Experience"
            content={
              <ContentEditable
                placeholder="What did you learning from working years?"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
              />
            }
          />
        </RightColumn>
      </Flex>
    </Wrapper>
  );
};

export default CvPage;
