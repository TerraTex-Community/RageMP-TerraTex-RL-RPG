import {getAdminRankDescription, getAllOnlineAdmins, isAdmin} from "./AdminHelper";
import {DbUser} from "../../DB/entities/DbUser";
import * as htmlEntities from "html-entities";
import {Chat} from "../System/Chat/Chat";
import sendChatAlertToPlayer = Chat.sendChatAlertToPlayer;

mp.events.addCommand("a", ((player, fullText, ...args) => {
    if (isAdmin(player, 1, true)) {
        const allAdmins = getAllOnlineAdmins();
        const description = getAdminRankDescription((<DbUser>player.customData.dbUser).admin);

        const sendMessage = new htmlEntities.AllHtmlEntities().encode(args.join(" "));

        const message = `<span style='color: yellow'>${description} ${player.getVariable("customChatNameTag")}: ${sendMessage}</span>`;

        mp.players.call(allAdmins, "addHTML", [message]);
    }
}));

mp.events.addCommand("alert", ((player, fullText, ...args) => {
    if (isAdmin(player, 3, true)) {
        const description = getAdminRankDescription((<DbUser>player.customData.dbUser).admin);
        const playerName = player.getVariable("customChatNameTag");
        const sendMessage = new htmlEntities.AllHtmlEntities().encode(args.join(" "));

        sendChatAlertToPlayer(mp.players.toArray(), "warning", sendMessage, `Adminalert von ${description} ${playerName}`);
    }
}));


