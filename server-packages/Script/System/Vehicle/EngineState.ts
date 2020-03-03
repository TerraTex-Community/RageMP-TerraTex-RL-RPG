import Vehicle = RageMP.Vehicle;

mp.events.add(RageMP.Enums.Event.PLAYER_EXIT_VEHICLE, (player: Player, vehicle: Vehicle) => {
    if (vehicle.engineState) {
        vehicle.engineState = vehicle.engine;
    }
});

mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_VEHICLE, (player: Player, vehicle: Vehicle) => {
    if (vehicle.engineState) {
        vehicle.engine = vehicle.engineState;
    }
});
