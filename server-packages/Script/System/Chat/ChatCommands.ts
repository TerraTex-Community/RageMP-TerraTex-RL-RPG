import * as htmlEntities from "html-entities";
import {isAdmin} from "../../Admin/AdminHelper";

mp.events.addCommand("global", ((player, fullText, ...args) => {
    if (mp.players.length >= 15 && !isAdmin(player, 1)) {
        player.call(
            "addHTML",
            `<span style="color:red">/global ist nur für Admins freigegeben, sobald mehr als 15 Spieler online sind!</span>`
        );
        return;
    }

    let sendMessage = new htmlEntities.AllHtmlEntities().encode(args.join(" "));
    let message = `<i>GlobalChat ${player.getVariable("customChatNameTag")}: ${sendMessage}</i>`;
    mp.players.call("addHTML", [message]);
}));

mp.events.addCommand("ooc", ((player, fullText, ...args) => {
    let sendMessage = new htmlEntities.AllHtmlEntities().encode(args.join(" "));
    let message = `<i>[[OOC-Chat ${player.getVariable("customChatNameTag")}: ${sendMessage}]]</i>`;
    mp.players.callInRange(player.position, 20, "addHTML", [message]);
}));

mp.events.addCommand("openchat", (player, fullText, ...args) => {
    player.call("openChatInput", [args.join(" ")]);
});

mp.events.addCommand("me", ((player, fullText, ...args) => {
    let sendMessage = new htmlEntities.AllHtmlEntities().encode(args.join(" "));
    let message = `<i style="color: purple">* ${player.getVariable("customChatNameTag")} ${sendMessage}</i>`;
    mp.players.callInRange(player.position, 20, "addHTML", [message]);
}));


