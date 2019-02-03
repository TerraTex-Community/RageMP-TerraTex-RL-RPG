let atmBrowser: BrowserMp | null = null;

mp.events.add("openATM", () => {
    if (atmBrowser) {
        return;
    }

    mp.gui.cursor.show(true, true);

    atmBrowser = mp.browsers.new('package://ui/index.html?page=pages/ATM.html');

    setTimeout(() => {
        updateATMUi();
    }, 250);
});

mp.events.add("browser_atm_close", () => {
    if (atmBrowser) {
        atmBrowser.destroy();
        atmBrowser = null;
    }
});

function updateATMUi() {
    if (!atmBrowser) return;

    const money = mp.players.local.getVariable("inventory.money");
    const bank = mp.players.local.getVariable("inventory.bank");
    atmBrowser.execute(`setAccount(${bank});`);
    atmBrowser.execute(`setMoney(${money});`);
}

// @todo: browser_atm_payInPayOut
// @todo: browser_atm_transfer
