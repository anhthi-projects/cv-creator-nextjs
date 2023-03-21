import Head from "next/head";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.title}>Hello world</div>
    </>
  );
};

export default Home;
