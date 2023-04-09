import Head from "next/head";

import ContentEditable from "@src/components/content-editable/content-editable";
import { Box, Flex } from "@src/components/layout";
import Section from "@src/components/section/section";
import {
  Color,
  FontSize,
  FontWeight,
  Page,
  Space,
} from "@src/styles/variables";

import Avatar from "./avatar";
import { PageWrapper, YourName, YourPosition } from "./design.styled";
import EditTools from "./edit-tools";

const Designing = () => {
  const renderNameAndPosition = () => {
    return (
      <>
        <ContentEditable
          text="Thi Nguyen Anh"
          placeholder="Your name"
          color={Color.Primary}
          fontSize={FontSize.Xl1}
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

  const renderContact = () => {
    return <Section title="Contact" marginTop={Space.px56} content="" />;
  };

  const renderAboutMe = () => {
    return (
      <Section
        title="About Me"
        marginTop={Space.px56}
        content={
          <ContentEditable
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
            textAlign="justify"
          />
        }
      />
    );
  };

  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <EditTools />
      <PageWrapper>
        <Flex>
          <Box
            width={Page.LeftColWidth}
            minWidth={Page.LeftColWidth}
            marginLeft={Space.px12}
            marginRight={Space.px36}
          >
            <Avatar />
            {renderNameAndPosition()}
            {renderContact()}
            {renderAboutMe()}
          </Box>
          <Flex flexGrow="1" flexDirection="column">
            <Section
              title="Working Experience"
              content={
                <ContentEditable text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" />
              }
            />
          </Flex>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default Designing;
