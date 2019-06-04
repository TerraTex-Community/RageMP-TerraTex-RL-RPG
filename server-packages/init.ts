import "reflect-metadata";
import {initDb} from "./Lib/Data/Database";
import "./Script/User/Connection/LoginEvents";
import "./Script/Admin";
import "./Script/User/Spawn/Spawn";
import "./Script/User/Spawn/Death";
import "./Lib/Version";
import "./Lib/Services/index";
import "./Script/System/index";
import {checkVehicleListAgainsWiki} from "./Lib/Data/VehicleWikiCheck";
import {logger} from "./Lib/Services/logging/logger";

async function initGameMode(): Promise<void> {
    await initDb();
    checkVehicleListAgainsWiki();

}

initGameMode()
    .then(() => logger.info("GameMode started successfully"))
    .catch(error => logger.error("error during startup: " + error.message, {error}));
