import { webToNodeStream } from "@/app/utils/webToNodeStream";
import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

export interface PdfGenerationResult {
  pdfStream: ReadableStream<Uint8Array>;
  title: string;
}

export const generatePdf = async (
  url: string,
  browserlessToken: string
): Promise<PdfGenerationResult> => {
  if (!browserlessToken) {
    throw new Error("Browserless token is required");
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://production-sfo.browserless.io?token=${browserlessToken}`,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto(url, { waitUntil: "load" });
    console.log("Waiting for images to load");
    await Promise.race([
      waitForImagesLoaded(page),
      new Promise((resolve) => setTimeout(() => resolve(undefined), 30000)),
    ]);
    console.log("Images loaded");

    const title = await getPageTitle(page);
    const webStream = await createPdfStream(page);
    const [stream1, stream2] = webStream.tee();
    closeBrowserOnStreamEnd(stream1, browser);

    return {
      pdfStream: stream2,
      title,
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
};

const getPageTitle = async (page: Page): Promise<string> => {
  try {
    const title = await page.title();
    return title || "download";
  } catch (error) {
    console.error("Error getting page title:", error);
    return "download";
  }
};

const waitForImagesLoaded = async (page: Page): Promise<void> => {
  await scrollThroughAllImages(page);
  return page.evaluate(async () => {
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

const scrollThroughAllImages = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    document.body.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    const scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    const selectors = Array.from(document.querySelectorAll("img"));

    for (const img of selectors) {
      img.scrollIntoView();
      await new Promise((res) => setTimeout(res, 10));
    }
  });
};

const createPdfStream = async (
  page: Page
): Promise<ReadableStream<Uint8Array>> => {
  return page.createPDFStream({
    format: "A4",
    height: 1024,
    width: 1280,
    printBackground: true,
    landscape: true,
  });
};

const closeBrowserOnStreamEnd = (
  stream1: ReadableStream<Uint8Array<ArrayBufferLike>>,
  browser: Browser
) => {
  const nodeStream = webToNodeStream(stream1);

  nodeStream.on("end", () => browser.close().catch(console.error));
  nodeStream.on("error", () => browser.close().catch(console.error));
};
