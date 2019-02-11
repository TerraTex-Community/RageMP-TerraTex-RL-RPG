let playerListBrowser: BrowserMp | undefined;

mp.events.add("player_loggedin", () => {
    playerListBrowser = mp.browsers.new('package://ui/index.html?page=pages/PlayerList.html');
    playerListBrowser.active = false;

    setInterval(updatePlayerList, 1500);
});

function updatePlayerList() {
    if (!playerListBrowser) return;

    mp.players.forEach((player: PlayerMp) => {
        if (!playerListBrowser) return;

        const ping = typeof player.getVariable("ping") === "number" ? player.getVariable("ping") : "-1";
        const playtime = typeof player.getVariable("data.playtime") === "number" ? player.getVariable("data.playtime") : "-1";

        playerListBrowser.execute(
            ` updateUser(${player.getVariable("id") || "-"}, "${player.name}", "${player.getVariable("charName") || "-"}", 
            ${playtime}, ${ping}, ${player.id === mp.players.local.id});`
        );
    });
}

function togglePlayerList() {
    if (!playerListBrowser) return;

    playerListBrowser.active = !playerListBrowser.active ;
}

mp.events.add(RageEnums.EventKey.PLAYER_QUIT, (player: PlayerMp) => {
    if (!playerListBrowser) return;

    playerListBrowser.execute(`removeUser(${player.getVariable("id")});`);
});
