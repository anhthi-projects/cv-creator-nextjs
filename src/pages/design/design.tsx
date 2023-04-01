import Head from "next/head";

import Avatar from "./avatar";
import styles from "./design.module.scss";
import EditTools from "./edit-tools";

const Designing = () => {
  return (
    <>
      <Head>
        <title>Design your CV</title>
      </Head>
      <EditTools />
      <div className={styles["page-wrapper"]}>
        <div className={styles["left-column"]}>
          <Avatar />
        </div>
        <div className={styles["right-column"]}>Right</div>
      </div>
    </>
  );
};

export default Designing;
