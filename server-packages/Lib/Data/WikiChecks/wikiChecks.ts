import {checkVehicleListAgainsWiki} from "./VehicleWikiCheck";
import {checkWeaponListAgainsWiki} from "./WeaponWikiCheck";
import {logger} from "../../Services/logging/logger";

export async function runWikiChecks(): Promise<void> {

    try {
        await Promise.all([
            checkVehicleListAgainsWiki(),
            checkWeaponListAgainsWiki()
        ]);
    } catch (e) {
        logger.error("Error during wiki checks: " + e.message, {error: e})
    }
}
