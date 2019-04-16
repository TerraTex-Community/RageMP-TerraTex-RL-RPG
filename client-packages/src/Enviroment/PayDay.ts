let payDayBrowser: BrowserMp | null = null;

mp.events.add("show_payday_ui", (paydayData: string) => {
    if (payDayBrowser) {
        return;
    }

    mp.gui.cursor.show(true, true);

    payDayBrowser = mp.browsers.new("package://ui/index.html?page=pages/PayDay-Calculation.html");

    setTimeout(() => {
        updatePayDayUI(JSON.parse(paydayData));
    }, 500);
});

function updatePayDayUI(data: any): void {
    if (!payDayBrowser) {
        return;
    }

    for (const incomeName in data.income) {
        if (data.income.hasOwnProperty(incomeName)) {
            payDayBrowser.execute(`addIncome("${incomeName}", ${data.income[incomeName]});`);
        }
    }

    for (const incomeName in data.outgoings) {
        if (data.outgoings.hasOwnProperty(incomeName)) {
            payDayBrowser.execute(`addOutgoing("${incomeName}", ${data.income[incomeName]});`);
        }
    }
}

mp.events.add("browser_payday_close", () => {
    if (!payDayBrowser) {
        return;
    }
    payDayBrowser.destroy();
    payDayBrowser = null;
});
