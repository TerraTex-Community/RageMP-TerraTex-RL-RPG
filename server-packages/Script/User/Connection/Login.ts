import * as crypto from "crypto";
import {DbUser} from "../../../DB/entities/DbUser";
import {ClientHelper} from "../../Helper/ClientHelper";
import {DbUserData} from "../../../DB/entities/DbUserData";
import {DbUserInventory} from "../../../DB/entities/DbUserInventory";
import {spawnPlayer} from "../Spawn/Spawn";
import Player = RageMP.Player;
import {syncPlayerData} from "./UserData";
import {isDevServer} from "../../Admin/AdminHelper";

export async function loginPlayer(player: Player, password: string): Promise<boolean> {
    const encryptedPw = crypto.createHash("sha256").update(password).digest("hex");

    const user = await DbUser.findAndCount({
        where: {
            nickname: player.name,
            password: encryptedPw
        }
    });

    if (user[1] < 1) {
        player.notify("~r~Das Passwort, dass du eingegeben hast, ist nicht korrekt.");

        ClientHelper.callClientSideFunc(
            player,
            "game.audio.playSoundFrontend",
            -1,
            "MP_IDLE_KICK",
            "HUD_FRONTEND_DEFAULT_SOUNDSET",
            true
        );

        player.call("login_startLoginProcess", [true, isDevServer(), true]);
        return false;
    }

    const userObj: DbUser = user[0][0];

    // ensure tables
    if (userObj.data === null) {
        await (new DbUserData(userObj)).save();
    }
    if (userObj.inventory === null) {
        await (new DbUserInventory(userObj)).save();
    }

    await userObj.reload();

    player.customData = {};
    player.customData.dbUser = userObj;

    player.setVariable("customNameTag", `[${userObj.id}]${player.name}`);
    player.setVariable("customChatNameTag", `[${userObj.id}]${player.name} (${userObj.forename} ${userObj.lastname})`);

    syncPlayerData(player);

    player.setVariable("loggedIn", true);
    player.call("player_loggedin");

    console.log("items");
    console.log(userObj.inventory.inventoryItems);

    spawnPlayer(player);

    return true;
}

export function isPlayerLoggedIn(player: Player): boolean {
    return !!player.getVariable("loggedIn");
}
