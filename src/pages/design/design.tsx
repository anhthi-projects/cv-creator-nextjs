import Head from "next/head";

import EditableText from "@src/components/editable-text";

import Avatar from "./avatar";
import { LeftColumn, PageWrapper, RightColumn } from "./design.styled";
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
        </LeftColumn>
        <RightColumn>
          <EditableText placeholder="Your name" />
        </RightColumn>
      </PageWrapper>
    </>
  );
};

export default Designing;
