import {logger} from "../Services/logging/logger";
import {getVehicleListItemByName} from "../../Script/System/Vehicle/VehicleList";
import puppeteer from "puppeteer";
import {waitForBrowserTitleToContain} from "../../Script/Helper/PuppeteerHelper";
import {LOG_TYPES} from "../Services/logging/log_types";
import {VEHICLE_BUY_MODE, VehicleListItem} from "../../Script/System/Vehicle/VehicleListItem";

const wikiUrl = "https://wiki.rage.mp/index.php?title=Vehicles";

export async function checkVehicleListAgainsWiki(): Promise<void> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(wikiUrl);
        await waitForBrowserTitleToContain(page, "vehicle");
        const contents = await page.$$(".gallerybox .gallerytext code");

        const listOfMissingVehicles: string[] = [];
        const listOfMissingVehiclePrices: string[] = [];
        for (const element of contents) {
            const name = (await (await element.getProperty("textContent")).jsonValue()).trim();
            const vehicleItem: VehicleListItem|false = getVehicleListItemByName(name);
            if(!vehicleItem) {
                listOfMissingVehicles.push(name);
            } else if (vehicleItem.price === -1 && vehicleItem.buyMode !== VEHICLE_BUY_MODE.NOT_BUYABLE) {
                listOfMissingVehiclePrices.push(name);
            }
        }

        if (listOfMissingVehicles.length > 0) {
            logger.warn("Vehicles in List (compared to Wiki) are Missing", {
                missingItems: listOfMissingVehicles,
                type: LOG_TYPES.MISSING_ITEMS
            });
        }

        if (listOfMissingVehiclePrices.length > 0) {
            logger.warn("Vehicles in List that are buyable have no price", {
                missingItems: listOfMissingVehiclePrices,
                type: LOG_TYPES.MISSING_ITEMS
            });
        }

        browser.close();
    } catch (e) {
        logger.error(`Could not load wiki vehicle list`, {error: e});
    }
}

checkVehicleListAgainsWiki();


