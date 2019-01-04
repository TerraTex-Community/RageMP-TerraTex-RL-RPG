import "reflect-metadata";
import {initDb} from './Lib/Data/Database';
import './Script/User/Connection/LoginEvents';
import {DbUser} from './DB/entities/DbUser';

async function initGameMode() {
    await initDb();

}

initGameMode()
    .then(() => console.log("GameMode started successfully"))
    .catch(e => console.error("error during startup:", e));
