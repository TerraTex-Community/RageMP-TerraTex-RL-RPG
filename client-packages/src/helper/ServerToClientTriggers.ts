// player.call("executeClientFunction", [funcPathAfterMP, JSON.stringify(args)]);

mp.events.add("executeClientFunction", (funcPath, args) => {
    const pathParts = funcPath.split('.');
    let func:any = mp;

    for (const part of pathParts) {
        func = func[part];
    }

    try {
        func.apply(null, JSON.parse(args));
    } catch(e) {
        console.error(e);
    }
});

