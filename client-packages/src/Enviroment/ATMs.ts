import {closeBrowserOnDistance, registerBrowserAsClickSystemDisabler} from "../helper/BrowserHelper";

let atmBrowser: BrowserMp | null = null;

mp.events.add("openATM", () => {
    if (atmBrowser) {
        return;
    }

    mp.gui.cursor.show(true, true);

    atmBrowser = mp.browsers.new('package://ui/index.html?page=pages/ATM.html');
    registerBrowserAsClickSystemDisabler(atmBrowser);
    closeBrowserOnDistance(atmBrowser, 5, () => {
        atmBrowser = null;
    });

    setTimeout(() => {
        updateATMUi();
    }, 500);
});

mp.events.add("updateATM", () => {
    updateATMUi();
});

mp.events.add("browser_atm_close", () => {
    if (atmBrowser) {
        atmBrowser.active = false;
        atmBrowser.destroy();
        atmBrowser = null;
    }
});

function updateATMUi(): void {
    if (!atmBrowser) return;

    const money = mp.players.local.getVariable("inventory.money");
    const bank = mp.players.local.getVariable("inventory.bank");
    atmBrowser.execute(`setAccount(${bank});`);
    atmBrowser.execute(`setMoney(${money});`);
}

// type === "in" | "out"
mp.events.add("browser_atm_payInPayOut", (type, amount, txt) => {
    mp.events.callRemote("atm_payInPayOut", type, parseFloat(amount), txt);
});


mp.events.add("browser_atm_transfer", (amount, receiver, txt) => {
    console.log(amount, receiver, txt);
    mp.events.callRemote("atm_transfer", parseFloat(amount), receiver, txt);
});
