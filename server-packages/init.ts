import "reflect-metadata";
import {initDb} from "./Lib/Data/Database";
import "./Script/User/Connection/LoginEvents";
import "./Script/Admin";
import "./Script/User/Spawn/Spawn";
import "./Script/User/Spawn/Death";
import "./Lib/Services/index";
import "./Script/System/index";
import {logger} from "./Lib/Services/logging/logger";
import {runWikiChecks} from "./Lib/Data/WikiChecks/wikiChecks";
import {loadAllPrivateVehicle} from "./Script/System/Vehicle/PrivateVehicles/loadAndSavePrivateVehicles";
import {setup, start, defaultClient} from "applicationinsights";
import {startWebServer} from "./ApiServer/webserver";
import {initVersionInstance} from "./Lib/Version";

async function initGameMode(): Promise<void> {
    mp.events.delayInitialization = true;
    if (mp.config.instrumentationKey) {
        setup(mp.config.instrumentationKey)
            .setSendLiveMetrics(true)
            .setAutoCollectConsole(true, true)
            .setAutoCollectDependencies(true)
            .setAutoCollectExceptions(true)
            .setAutoCollectPerformance(true)
            .setAutoCollectRequests(true)
            .setAutoDependencyCorrelation(true, true);

        start();
    }
    await initDb();
    await loadAllPrivateVehicle();

    mp.events.delayInitialization = false;
    startWebServer();
    runWikiChecks();
    initVersionInstance();
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

