import request from "request-promise";
import cheerio from "cheerio";
import {getVehicleListItemByName} from "../../Script/System/Vehicle/VehicleList";

const wikiUrl = "https://wiki.rage.mp/index.php?title=Vehicles";

export async function checkVehicleListAgainsWiki(): Promise<void> {
    try {
        const result = await request(wikiUrl);
        const $ = cheerio.load(result);
        $(".gallerybox .gallerytext code").each(function(i: number, ele: CheerioElement): void {
            // tslint:disable-next-line:no-invalid-this
            // @ts-ignore
            const name = $(this).text().trim();
            if(!getVehicleListItemByName(name)) {
                console.error(`Missing Vehicle in List: ${name}`);
            }
        });
    } catch (e) {
        console.error(`Could not load wiki vehicle list`, e);
    }
}
