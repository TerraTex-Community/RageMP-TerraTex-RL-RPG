let hudBrowser: BrowserMp | null = null;
let hud_money = 0;
let hud_gold = 0;

mp.events.add("player_loggedin", () => {
    hudBrowser = mp.browsers.new('package://ui/index.html?page=pages/Hud.html');
    hudBrowser.active = false;
    setTimeout(() => {
        if (!hudBrowser) return;
        hud_money = mp.players.local.getVariable("inventory.money");
        hudBrowser.execute(`setMoney(${hud_money});`);
        hudBrowser.active = true;
    }, 500);
});

mp.events.add(RageEnums.EventKey.RENDER, () => {
    if (!hudBrowser || !hudBrowser.active) return;

    if (typeof mp.players.local.getVariable("inventory.money") === "number") {
        if (mp.players.local.getVariable("inventory.money") !== hud_money
        ) {
            hud_money = mp.players.local.getVariable("inventory.money");
            console.log(hud_money);
            hudBrowser.execute(`setMoney(${hud_money});`);
        }
    }

    if (typeof mp.players.local.getVariable("inventory.gold") === "number") {
        if (mp.players.local.getVariable("inventory.gold") !== hud_gold
        ) {
            hud_gold = mp.players.local.getVariable("inventory.gold");
            hudBrowser.execute(`setGold(${hud_gold});`);
        }
    } else {
        hudBrowser.execute(`setGold("not implemented")`);
    }

    const date = new Date();
    hudBrowser.execute(`setClock(${date.getHours()}, ${date.getMinutes()});`);

});


