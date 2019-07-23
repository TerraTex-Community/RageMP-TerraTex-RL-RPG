mp.events.add('render', () => {
    const vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getVariable("isMeeresTug")) {
        vehicle.setEngineTorqueMultiplier(200);
        vehicle.setEnginePowerMultiplier(200);
    }
});

let endBlip: BlipMp;
let endMarker: MarkerMp;
let nextBlip: BlipMp;
let nextMarker: MarkerMp;

mp.events.add("meeresreiniger_create_start", (x: number, y: number) => {
    endBlip = mp.blips.new(529, new mp.Vector3(x, y, 0),
        {
            name: "Anlegestelle für Meeresreiniger",
            color: 5,
            drawDistance: 10000,
            shortRange: false
        });

    endMarker = mp.markers.new(1, new mp.Vector3(x, y, 0), 20,
        {
            color: [255, 255, 0, 150],
            visible: true
        });
});

mp.events.add("meeresreiniger_create_next", (x: number, y: number) => {
    nextBlip = mp.blips.new(529, new mp.Vector3(x, y, 0),
        {
            name: "Nächste Meeresreinigerposition",
            color: 50,
            drawDistance: 10000,
            shortRange: false
        });

    nextMarker = mp.markers.new(1, new mp.Vector3(x, y, 0), 20,
        {
            color: [0, 0, 204, 150],
            visible: true
        });
});

mp.events.add("meeresreiniger_remove_start", () => {
    if (endBlip) {
        endBlip.destroy();
        endMarker.destroy();
        endBlip = null;
        endMarker = null;
    }
});

mp.events.add("meeresreiniger_remove", () => {
    if (endBlip) {
        nextBlip.destroy();
        nextMarker.destroy();
        nextBlip = null;
        nextMarker = null;
    }
});
