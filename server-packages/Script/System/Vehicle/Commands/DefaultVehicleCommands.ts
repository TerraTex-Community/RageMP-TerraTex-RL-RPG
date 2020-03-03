import Player = RageMP.Player;

mp.events.addCommand("toggle_vehicle_engine", (player: Player) => {
    if (player.vehicle) {
        if (player.seat === 0) {
            player.vehicle.engine = !player.vehicle.engine;
            player.vehicle.engineState = player.vehicle.engine;
        }
    }
});
