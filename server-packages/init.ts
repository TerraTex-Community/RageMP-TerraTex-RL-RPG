import "reflect-metadata";
import {initDb} from "./Lib/Data/Database";
import "./Script/User/Connection/LoginEvents";
import "./Script/Admin";
import "./Script/User/Spawn/Spawn";
import "./Script/User/Spawn/Death";
import "./Lib/Version";
import "./Lib/Services/index";
import "./Script/System/index";
import {logger} from "./Lib/Services/logging/logger";
import {runWikiChecks} from "./Lib/Data/WikiChecks/wikiChecks";
import {loadAllPrivateVehicle} from "./Script/System/Vehicle/PrivateVehicles/loadAndSavePrivateVehicles";
import appInsights from "applicationinsights"

async function initGameMode(): Promise<void> {
    mp.events.delayInitialization = true;
    if (mp.config.instrumentationKey) {
        appInsights.setup(mp.config.instrumentationKey);
        appInsights.start();
    }
    await initDb();
    await loadAllPrivateVehicle();

    await runWikiChecks();
    mp.events.delayInitialization = false;
}

initGameMode()
    .then(() => logger.info("GameMode started successfully"))
    .catch(error => logger.error(`error during startup: ${error.message}`, {error, level: "crit"}));


process.on('uncaughtException', (err) => {
    logger.error("unexpected Error", {error: err, level: "crit"});
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', {promise, reason, level: "crit"});
});

process.on('warning', (warning) => {
    logger.warn('Warning:', {error: warning});
});
