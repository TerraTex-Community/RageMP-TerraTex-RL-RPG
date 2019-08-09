import {DbUser} from "../../../DB/entities/DbUser";
import Player = RageMP.Player;
import {isAdmin} from "../../Admin/AdminHelper";
import {ShutdownService} from "../../../Lib/Services/ShutdownService";
import {logger} from "../../../Lib/Services/logging/logger";


setInterval(savePlayers, 1800000);

function savePlayers(): Promise<any> {
    const allPromises: Promise<DbUser>[] = [];

    for (const player of mp.players.toArray()) {
        if (player.getVariable("loggedIn")) {
            const promise: Promise<DbUser> = (<DbUser>player.customData.dbUser).save();
            allPromises.push(promise);
            promise.then(() => {
                logger.info(`Datastore: ${player.name} saved.`);
            }).catch((error) => logger.error(error.message, {error}));
        }
    }

    return Promise.all(allPromises);
}

async function handlePlayersOnShutdown(): Promise<void> {
    for (const player of mp.players.toArray()) {
        setPlayerShutDownView(player);
    }

    await savePlayers();

    for (const player of mp.players.toArray()) {
        player.kick("Servershutdown");
    }
}

ShutdownService.addToShutdownService(handlePlayersOnShutdown, false);

function setPlayerShutDownView(player: Player): void {
    player.alpha = 0;
    player.position = new mp.Vector3(0, 0, 200);
    player.dimension = 1;

    player.call("setShutDownView");
}

mp.events.add(RageMP.Enums.Event.PLAYER_QUIT, (player: Player) => {
    if (player.getVariable("loggedIn")) {
        player.customData.dbUser.save();
    }
});

mp.events.addCommand("saveplayers", (player: Player) => {
    if (!isAdmin(player, 4, true)) {
        return;
    }

    savePlayers();
});
