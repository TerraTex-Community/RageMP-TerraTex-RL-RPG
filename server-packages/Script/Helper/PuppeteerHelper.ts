import {Page} from "puppeteer";
import {wait} from "./Utilities";

export async function waitForBrowserTitleToContain(page: Page, content: string, maxTimeOut: number = 300000): Promise<void> {
    let calcTime = 0;
    let actualTitle = await page.title();
    while (actualTitle.toLowerCase().indexOf(content.toLowerCase()) === -1) {
        try {
            actualTitle = await page.title();
        } catch (e) {
            console.error("retry because of error");
        }
        if (calcTime >= maxTimeOut) {
            throw new Error(`waitForBrowserTitle timed out. ${actualTitle} != ${content}`);
        }
        await wait(300);
        calcTime += 300;
    }
}
