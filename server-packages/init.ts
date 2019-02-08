import "reflect-metadata";
import {initDb} from './Lib/Data/Database';
import './Script/User/Connection/LoginEvents';
import './Script/Admin/loadAdmin';
import './Script/User/Spawn/Spawn';
import './Script/User/Spawn/Death';
import './Script/System/Chat/Chat';
import './Lib/Version';
import './Script/System/Money/ATM';
import './Script/System/Clock';

async function initGameMode() {
    await initDb();

}

initGameMode()
    .then(() => console.log("GameMode started successfully"))
    .catch(e => console.error("error during startup:", e));
