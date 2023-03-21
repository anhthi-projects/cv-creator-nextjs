import "@src/styles/index.scss";
import { AppProps } from "next/app";
import Head from "next/head";

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta name="description" content="CV Creator" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
