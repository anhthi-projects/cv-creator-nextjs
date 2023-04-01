import Head from "next/head";

import styles from "./design.module.scss";

const Designing = () => {
  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <div className={styles["page-wrapper"]}>Design your cv</div>
    </>
  );
};

export default Designing;
