import { AppProps } from "next/app";

import GlobalStyles from "@src/styles/global-styles";

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
