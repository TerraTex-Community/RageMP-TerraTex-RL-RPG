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

async function initGameMode(): Promise<void> {
    await initDb();
    await loadAllPrivateVehicle();

    runWikiChecks();
}

initGameMode()
    .then(() => logger.info("GameMode started successfully"))
    .catch(error => logger.crit("error during startup: " + error.message, {error}));


process.on('uncaughtException', (err) => {
    logger.crit("unexpected Error", {error: err});
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.crit('Unhandled Rejection at:', {promise, reason});
});

process.on('warning', (warning) => {
    logger.warn('Warning:', {error: warning});
});
