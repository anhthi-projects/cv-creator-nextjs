import puppeteer from "puppeteer";

import { Page } from "@src/styles/variables";

const Download = () => <div />;

export async function getServerSideProps() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/design?m=preview", {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("screen");
    await page.pdf({
      path: `pdf/result.pdf`,
      format: "a4",
      scale: 800 / 1200,
    });

    await browser.close();
  })();

  return {
    props: {},
  };
}

export default Download;
