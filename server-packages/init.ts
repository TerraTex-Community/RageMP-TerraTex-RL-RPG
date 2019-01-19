import "reflect-metadata";
import {initDb} from './Lib/Data/Database';
import './Script/User/Connection/LoginEvents';
import {DbUser} from './DB/entities/DbUser';
import './Script/Admin/loadAdmin';
import './Script/User/Spawn/Spawn';
import './Script/User/Spawn/Death';
import './Script/System/Chat';

async function initGameMode() {
    await initDb();

}

initGameMode()
    .then(() => console.log("GameMode started successfully"))
    .catch(e => console.error("error during startup:", e));

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.error(err);

    setTimeout(process.exit, 10000, 1);
});
process.on('unhandledRejection', function(err) {
    // handle the error safely
    console.error(err);
    setTimeout(process.exit, 10000, 1);

});
