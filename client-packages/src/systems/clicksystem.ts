let clickDebug = false;
let lastEntity: EntityMp | number | null = null;

// trigger also to server
mp.events.add("click", (x, y, upOrDown, leftOrRight) => {
    for (const browser of mp.browsers.toArray()) {
        // @ts-ignore
        if (browser && browser.disablesClickSystem && browser.active) {
            return;
        }
    }

    const pos3d = mp.game.graphics.screen2dToWorld3d([x, y]);
    const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera
    const position = camera.getCoord();

    const end = lerp(position, pos3d, 5);

    //@ts-ignore
    const result = mp.raycasting.testPointToPoint(position, end, null, -1);
    if (result) {
        const entityData = {
            resultEntityData: result.entity,
            position: result.position,
            model: mp.game.invoke(RageEnums.Natives.Entity.GET_ENTITY_MODEL, result.entity)
        };

        if (clickDebug) {
            resetLastEntity();
            if (typeof result.entity === "number") {
                mp.game.invoke(RageEnums.Natives.Entity.SET_ENTITY_ALPHA, result.entity, 150, false);
                console.log("Clicked on World: ", entityData);
            } else {
                console.log("Clicked on Entity: ", entityData, result.entity);
                result.entity.setAlpha(150);
            }
            lastEntity = result.entity;
        }

        mp.events.callRemote("playerClickOnEntity", x, y, upOrDown, leftOrRight, JSON.stringify(entityData), result.entity);
    } else {
        mp.events.callRemote("playerClick", x, y, upOrDown, leftOrRight, pos3d);
    }
});

function lerp(v1: Vector3Mp, v2: Vector3Mp, t: number): Vector3Mp {
    const vr = new mp.Vector3(v1.x, v1.y, v1.z);
    vr.x = v1.x + (v2.x - v1.x) * t;
    vr.y = v1.y + (v2.y - v1.y) * t;
    vr.z = v1.z + (v2.z - v1.z) * t;
    return vr;
}

mp.events.add("debug_click", () => {
    resetLastEntity();
    clickDebug = !clickDebug;
    mp.gui.chat.push(clickDebug ? "click debug enabled" : "click debug disabled");
});

function resetLastEntity(): void {
    if (lastEntity) {
        if (typeof lastEntity === "number") {
            mp.game.invoke(RageEnums.Natives.Entity.RESET_ENTITY_ALPHA, lastEntity);
        } else {
            lastEntity.setAlpha(255);
        }
        lastEntity = null;
    }
}
