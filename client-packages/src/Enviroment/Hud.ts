let hudBrowser: BrowserMp | null = null;
let hudMoney = 0;
let hudGold = 0;

mp.events.add("player_loggedin", () => {
    hudBrowser = mp.browsers.new('package://ui/index.html?page=pages/Hud.html');
    hudBrowser.active = false;
    setTimeout(() => {
        if (!hudBrowser) return;
        hudMoney = mp.players.local.getVariable("inventory.money");
        hudBrowser.execute(`setMoney(${hudMoney});`);
        hudBrowser.active = true;
    }, 500);
});

mp.events.add(RageEnums.EventKey.RENDER, () => {
    if (!hudBrowser || !hudBrowser.active) return;

    if (typeof mp.players.local.getVariable("inventory.money") === "number") {
        if (mp.players.local.getVariable("inventory.money") !== hudMoney
        ) {
            hudMoney = mp.players.local.getVariable("inventory.money");
            console.log(hudMoney);
            hudBrowser.execute(`setMoney(${hudMoney});`);
        }
    }

    if (typeof mp.players.local.getVariable("inventory.gold") === "number") {
        if (mp.players.local.getVariable("inventory.gold") !== hudGold
        ) {
            hudGold = mp.players.local.getVariable("inventory.gold");
            hudBrowser.execute(`setGold(${hudGold});`);
        }
    } else {
        hudBrowser.execute(`setGold("not implemented")`);
    }

    const date = new Date();
    hudBrowser.execute(`setClock(${date.getHours()}, ${date.getMinutes()});`);

});


