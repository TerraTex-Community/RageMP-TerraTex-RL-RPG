import * as htmlEntities from 'html-entities';

mp.events.addCommand("global", ((player, fullText, ...args) => {
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
    let message = `<i style="color: purple">* ${player.getVariable("customChatNameTag")} ${sendMessage}]]</i>`;
    mp.players.callInRange(player.position, 20, "addHTML", [message]);
}));


