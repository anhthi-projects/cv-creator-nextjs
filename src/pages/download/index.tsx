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
        top: Page.PadTopBottom - 10,
        right: Page.PadLeftRight - 10,
        bottom: Page.PadTopBottom - 10,
        left: Page.PadLeftRight - 10,
      },
    });

    await browser.close();
  })();

  return {
    props: {},
  };
}

export default Download;
