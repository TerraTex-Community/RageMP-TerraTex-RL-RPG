import {registerServerCommand} from "../../../Lib/Services/ServerConsole";
import Player = RageMP.Player;

registerServerCommand("players", () => {
    const playerList: string[] = [];
    mp.players.forEach((player: Player) => {
        let id = "--";
        if (player.getVariable("loggedIn")) {
            id = player.customData.dbUser.id;
        }
        playerList.push(`[${id}]${player.name}`);
    });

    console.info(`${playerList.length} Players Online: ${playerList.join(",")}`);
});
