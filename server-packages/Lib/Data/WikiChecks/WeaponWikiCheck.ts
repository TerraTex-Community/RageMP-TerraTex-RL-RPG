import {logger} from "../../Services/logging/logger";
import puppeteer from "puppeteer";
import {waitForBrowserTitleToContain} from "../../../Script/Helper/PuppeteerHelper";
import {LOG_TYPES} from "../../Services/logging/log_types";
import {WEAPON_BUY_MODE, WeaponListItem} from "../../../Script/System/Weapons/WeaponListItem";
import {getWeaponListItemByModelId} from "../../../Script/System/Weapons/WeaponList";

const wikiUrl = "https://wiki.rage.mp/index.php?title=Weapons";

export async function checkWeaponListAgainsWiki(): Promise<void> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(wikiUrl);
        await waitForBrowserTitleToContain(page, "weapons");
        const contents = await page.$$(".gallerybox .gallerytext code");

        const listOfMissingWeapons: string[] = [];
        const listOfMissingWeaponPrices: string[] = [];
        for (const element of contents) {
            // @ts-ignore
            const name = (await (await element.getProperty("textContent")).jsonValue()).trim();
            const weaponItem: WeaponListItem|false = getWeaponListItemByModelId(name);
            if(!weaponItem) {
                listOfMissingWeapons.push(name);
            } else if (weaponItem.price === -1 && weaponItem.buyMode !== WEAPON_BUY_MODE.NOT_BUYABLE) {
                listOfMissingWeaponPrices.push(name);
            }
        }

        if (listOfMissingWeapons.length > 0) {
            logger.warn("Weapons in List (compared to Wiki) are Missing", {
                missingItems: listOfMissingWeapons,
                type: LOG_TYPES.MISSING_ITEMS
            });
        }

        if (listOfMissingWeaponPrices.length > 0) {
            logger.warn("Weapons in List that are buyable have no price", {
                missingItems: listOfMissingWeaponPrices,
                type: LOG_TYPES.MISSING_ITEMS
            });
        }

        page.close();
    } catch (e) {
        logger.error(`Could not load wiki vehicle list`, {error: e});
    }
}


