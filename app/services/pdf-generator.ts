import { webToNodeStream } from '@/app/utils/webToNodeStream';
import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';

export interface PdfGenerationResult {
  pdfStream: ReadableStream<Uint8Array>;
  title: string;
}

export const generatePdf = async (
  url: string,
  browserlessToken: string
): Promise<PdfGenerationResult> => {
  if (!browserlessToken) {
    throw new Error('Browserless token is required');
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://production-sfo.browserless.io?token=${browserlessToken}`,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto(url, { waitUntil: 'load' });
    console.log('Waiting for images to load');
    await Promise.race([
      waitForImagesLoaded(page),
      new Promise(resolve => setTimeout(() => resolve(undefined), 30000)),
    ]);
    console.log('Images loaded');

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
    return title || 'download';
  } catch (error) {
    console.error('Error getting page title:', error);
    return 'download';
  }
};

const waitForImagesLoaded = async (page: Page): Promise<unknown> => {
  await autoScroll(page);
  await removeLazyLoading(page);
  return page.waitForFunction(
    () => {
      return Array.from(document.images).every(i => i.complete);
    },
    { timeout: 20000 }
  );
};

const removeLazyLoading = async (page: Page) => {
  await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.removeAttribute('loading');
    });
  });
};

const autoScroll = async (page: Page) => {
  await page.evaluate(async () => {
    const scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
    const images = document.querySelectorAll('img');

    for (const image of images) {
      image.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  });

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
};

const createPdfStream = async (
  page: Page
): Promise<ReadableStream<Uint8Array>> => {
  return page.createPDFStream({
    format: 'A4',
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

  nodeStream.on('end', () => browser.close().catch(console.error));
  nodeStream.on('error', () => browser.close().catch(console.error));
};
