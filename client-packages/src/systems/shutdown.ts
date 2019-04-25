mp.events.add("setShutDownView", () => {
    mp.players.local.freezePosition(true);
    mp.players.local.alpha = 0;
    mp.players.local.position = new mp.Vector3(0,0,200);
    mp.players.local.dimension = 1;

    mp.browsers.forEach(browser => {
        browser.destroy();
    });

    mp.events.add('render', () => {
        mp.game.ui.setLoadingPromptTextEntry("PM_WAIT");
        mp.game.ui.addTextComponentSubstringPlayerName("~r~ The Server is shutting down / restarting.");
        mp.game.ui.showLoadingPrompt(1);
    });
});

