import Head from "next/head";

import CvPage from "./cv-page/cv-page";
import Profile from "./profile/profile";
import SideBar from "./sidebar/sidebar";

const Design = () => {
  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <Profile />
      <SideBar />
      <CvPage />
    </>
  );
};

export default Design;
