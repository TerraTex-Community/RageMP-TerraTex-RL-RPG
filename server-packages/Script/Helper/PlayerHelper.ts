import {DbUser} from "../../DB/entities/DbUser";
import Player = RageMP.Player;

export function getPlayerFromNameOrId(playerNameOrId: string | number): false | Player {
    if (typeof playerNameOrId === "string" && /^\d+$/.test(playerNameOrId)) {
        return getPlayerFromId(parseInt(playerNameOrId));
    } else if (typeof playerNameOrId === "number") {
        return getPlayerFromId(playerNameOrId);
    } else if (playerNameOrId === "string") {
        return getPlayerFromName(playerNameOrId);
    } else {
        return false;
    }
}

function getPlayerFromName(playerName): false | Player {
    if (playerName.length <= 3) {
        return false;
    }

    const possiblePlayers: Player[] = [];

    for (const player of mp.players.toArray()) {
        if (player.name.indexOf(playerName) !== -1) {
            possiblePlayers.push(player);
        }
    }

    if (possiblePlayers.length === 1) {
        return possiblePlayers[0];
    }

    return false;
}

function getPlayerFromId(playerId): false | Player {
    for (const player of mp.players.toArray()) {
        if ((<DbUser>player.customData.dbUser).id === playerId) {
            return player;
        }
    }

    return false;
}
