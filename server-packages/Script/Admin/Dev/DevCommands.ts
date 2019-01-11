mp.events.addCommand("veh", (player: PlayerMp, text: string, vehModel) => {
    mp.vehicles.new(mp.joaat(vehModel), player.position);
});
