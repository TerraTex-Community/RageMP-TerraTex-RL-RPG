let closeBrowserColshapes: any = {};

function closeBrowserOnDistance(browser: BrowserMp, distance: number, callAfter: Function | null): void {
    const position = mp.players.local.position;
    const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, distance);
    closeBrowserColshapes[colshape.handle] = {
        browser, callAfter
    };
}

mp.events.add(RageEnums.EventKey.PLAYER_EXIT_COLSHAPE, (shape: ColshapeMp) => {
    if (closeBrowserColshapes[shape.handle]) {
        const browser: BrowserMp = closeBrowserColshapes[shape.handle].browser;
        const callAfter: Function | null = closeBrowserColshapes[shape.handle].callAfter;
        try {
            browser.destroy();
            delete closeBrowserColshapes[shape.handle];
            shape.destroy();
            if (callAfter) {
                callAfter();
            }
        } catch (e) {
            console.error(e);
        }
    }
});

