import {DbUser} from "../../../DB/entities/DbUser";
import Player = RageMP.Player;
import {isAdmin} from "../../Admin/AdminHelper";
import {ShutdownService} from "../../../Lib/Services/ShutdownService";


setInterval(savePlayers, 1800000);

function savePlayers(): Promise<any> {
    const allPromises: Promise<DbUser>[] = [];

    for (const player of mp.players.toArray()) {
        if (player.getVariable("loggedIn")) {
            const promise: Promise<DbUser> = (<DbUser>player.customData.dbUser).save();
            allPromises.push(promise);
            promise.then(() => {
                console.log(`Datastore: ${player.name} saved.`);
            }).catch((e: any) => console.error(e));
        }
    }

    return Promise.all(allPromises);
}

function handlePlayersOnShutdown(): void {
    for (const player of mp.players.toArray()) {
        setPlayerShutDownView(player);
    }

}

ShutdownService.addToShutdownService(handlePlayersOnShutdown);

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
