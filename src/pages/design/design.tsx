import Head from "next/head";

import EditableText from "@src/components/editable-text";
import { Color, FontSize, FontWeight } from "@src/styles/variables";

import Avatar from "./avatar";
import { LeftColumn, PageWrapper, RightColumn } from "./design.styled";
import EditTools from "./edit-tools";
import { Flex } from "@src/components/layout";

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
          <EditableText text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" />
        </LeftColumn>
        <RightColumn>
          <Flex mt="55px" flexDirection="column">
            <EditableText
              placeholder="Your name"
              fontSize={FontSize.Xl2}
              fontWeight={FontWeight.Bold}
              color={Color.Blue}
            />
            <EditableText
              placeholder="Your position"
              fontSize={FontSize.Lg}
              fontWeight={FontWeight.Bold}
              color={Color.Light8}
            />
          </Flex>
        </RightColumn>
      </PageWrapper>
    </>
  );
};

export default Designing;
