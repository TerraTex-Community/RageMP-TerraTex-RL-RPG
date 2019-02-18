import "reflect-metadata";
import {initDb} from "./Lib/Data/Database";
import "./Script/User/Connection/LoginEvents";
import "./Script/Admin";
import "./Script/User/Spawn/Spawn";
import "./Script/User/Spawn/Death";
import "./Lib/Version";
import "./Script/System/Chat/Chat";
import "./Script/System/Money";
import "./Script/System/Clock";
import "./Lib/Services/index";

async function initGameMode() {
    await initDb();

}

initGameMode()
    .then(() => console.log("GameMode started successfully"))
    .catch(e => console.error("error during startup:", e));
