import {Page} from "puppeteer";
import {wait} from "./Utilities";

export async function waitForBrowserTitleToContain(page: Page, content: string, maxTimeOut: number = 300000): Promise<void> {
    let calcTime = 0;
    while ((await page.title()).toLowerCase().indexOf(content.toLowerCase()) === -1) {
        const title = await page.title();
        if (calcTime >= maxTimeOut) throw new Error(`waitForBrowserTitle timed out. ${title} != ${content}`);
        await wait(300);
        calcTime += 300;
    }
}
