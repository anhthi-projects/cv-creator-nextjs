import puppeteer from "puppeteer";

import { Page } from "@src/styles/variables";

const Download = () => <div />;

export async function getServerSideProps() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/design?mo=preview", {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("screen");
    await page.pdf({
      path: `export/cv.pdf`,
      scale: 800 / Page.Width,
      format: "a4",
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });

    await browser.close();
  })();

  return {
    props: {},
  };
}

export default Download;
