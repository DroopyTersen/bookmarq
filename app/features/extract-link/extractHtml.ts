export const extractHtml = async (url: string) => {
  try {
    let puppeteer =
      process.env.PUBLIC_ENV === "PROD"
        ? await import("puppeteer-core")
        : await import("puppeteer");
    const browser = await puppeteer.launch({
      executablePath: process.env.PUBLIC_ENV === "PROD" ? process.env.CHROME_BIN : undefined,
      args: [
        // Required for Docker version of Puppeteer
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    // const pageContent = await page.$eval("body", (bod) => body.innerHTML);
    // await wait(5000);
    const pageContent = await page.content();
    await browser.close();
    return pageContent;
  } catch (err) {
    console.log(`Error while fetching ${url} `, err);
    return "";
  }
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
