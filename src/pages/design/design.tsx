import Head from "next/head";

import ContentEditable from "@src/components/content-editable/content-editable";
import { Flex } from "@src/components/layout";
import { Color, FontSize, FontWeight } from "@src/styles/variables";

import Avatar from "./avatar";
import {
  LeftColumn,
  PageWrapper,
  RightColumn,
  YourName,
  YourPosition,
} from "./design.styled";
import EditTools from "./edit-tools";

const Designing = () => {
  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <EditTools />
      <PageWrapper>
        <LeftColumn>
          <Avatar />
          <ContentEditable text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" />
        </LeftColumn>
        <RightColumn>
          <Flex mt="65px" flexDirection="column">
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
        </RightColumn>
      </PageWrapper>
    </>
  );
};

export default Designing;
