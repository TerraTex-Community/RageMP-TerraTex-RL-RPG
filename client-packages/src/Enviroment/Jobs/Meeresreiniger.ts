mp.events.add('render', () => {
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getVariable("isMeeresTug")) {
        vehicle.setEngineTorqueMultiplier(200);
        vehicle.setEnginePowerMultiplier(200);
    }
});
