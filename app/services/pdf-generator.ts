import { webToNodeStream } from "@/app/utils/webToNodeStream";
import type { Page } from "puppeteer";
import puppeteer from "puppeteer";

export const generatePdf = async (
  url: string,
  browserlessToken: string
): Promise<ReadableStream<Uint8Array>> => {
  if (!browserlessToken) {
    throw new Error("Browserless token is required");
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://production-sfo.browserless.io?token=${browserlessToken}`,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto(url, { waitUntil: "domcontentloaded" });
    console.log("Waiting for images to load");
    await Promise.race([
      waitForImagesLoaded(page),
      new Promise((resolve) => setTimeout(() => resolve(undefined), 10000)),
    ]);
    console.log("Images loaded");
    const webStream = await createPdfStream(page);
    const [stream1, stream2] = webStream.tee();
    const nodeStream = webToNodeStream(stream1);

    nodeStream.on("end", () => browser.disconnect().catch(console.error));
    nodeStream.on("error", () => browser.disconnect().catch(console.error));

    return stream2;
  } catch (error) {
    await browser.disconnect();
    throw error;
  }
};

const waitForImagesLoaded = async (page: Page): Promise<void> => {
  return page.evaluate(async () => {
    document.body.scrollIntoView(false);
    const selectors = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      selectors.map((img) => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", reject);
        });
      })
    );
  });
};

const createPdfStream = async (
  page: Page
): Promise<ReadableStream<Uint8Array>> => {
  return page.createPDFStream({
    format: "A4",
  });
};
