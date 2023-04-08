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
  const renderHeader = () => {
    return (
      <Flex>
        <Box
          width={Page.SmallLeftColWidth}
          minWidth={Page.SmallLeftColWidth}
          marginLeft={Space.px12}
          marginRight={Space.px36}
        >
          <Avatar />
        </Box>
        <Flex flexGrow="1" flexDirection="column" justifyContent="center">
          <YourName
            placeholder="Your name"
            color={Color.Blue}
            fontSize={FontSize.Xl2}
            fontWeight={FontWeight.Bold}
          />
          <YourPosition
            placeholder="Your position"
            color={Color.Light8}
            fontSize={FontSize.Lg}
            fontWeight={FontWeight.Bold}
          />
        </Flex>
      </Flex>
    );
  };

  const renderBody = () => {
    return (
      <Flex marginTop={Space.px36}>
        <Box
          width={Page.LargeLeftColWidth}
          minWidth={Page.LargeLeftColWidth}
          marginRight={Space.px20}
        >
          <Section
            title="About Me"
            content={
              <ContentEditable
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
                textAlign="justify"
              />
            }
          />
        </Box>
        <Flex flexGrow="1">
          <Section
            title="Working Experience"
            content={
              <ContentEditable text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" />
            }
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <EditTools />
      <PageWrapper>
        {renderHeader()}
        {renderBody()}
      </PageWrapper>
    </>
  );
};

export default Designing;
