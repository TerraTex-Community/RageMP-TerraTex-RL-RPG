// player.call("executeClientFunction", [funcPathAfterMP, JSON.stringify(args)]);

mp.events.add("executeClientFunction", (funcPath, args) => {

    if (checkForSpecialCase(funcPath, JSON.parse(args))) {
        return;
    }

    const pathParts = funcPath.split('.');
    let func:any = mp;

    for (const part of pathParts) {
        func = func[part];
    }

    try {
        func.apply(null, JSON.parse(args));
    } catch(e) {
        console.error("error on calling client func", e);
    }
});

function checkForSpecialCase(funcPath: any, parse: any): boolean {
    switch(funcPath) {
        case "players.local.freezePosition":
            mp.players.local.freezePosition(parse[0]);
            return true;
    }

    return false;
}
