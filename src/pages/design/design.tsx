import { FC } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import CvPage from "./cv-page/cv-page";
import SideBar from "./sidebar/sidebar";

const Design = () => {
  const { query } = useRouter();
  const isInPreview = query.mo === "preview";

  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      {!isInPreview && <SideBar />}
      <CvPage />
    </>
  );
};

export default Design;
