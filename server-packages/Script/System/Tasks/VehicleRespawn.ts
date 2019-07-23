import {ScriptedVehicle} from "../Vehicle/ScriptedVehicle";
import Player = RageMP.Player;

setInterval(() => {
    const vehs = mp.vehicles.toArray();
    for (const vehicle of vehs) {
        if (vehicle.idleRespawnTime
            && vehicle.idleRespawnTime > 0
            && vehicle.lastExistTime
            && new Date().getTime() - vehicle.lastExistTime.getTime() > vehicle.idleRespawnTime
            && vehicle.getOccupants().length === 0
        ) {
            resetVeh(vehicle);
        }

        if (vehicle.respawnTime
            && vehicle.respawnTime > 0
            && vehicle.lastDeathTime
            && new Date().getTime() - vehicle.lastDeathTime.getTime() > vehicle.respawnTime
            && vehicle.dead
            && vehicle.originalPos
        ) {
            vehicle.spawn(vehicle.originalPos, 0);
            resetVeh(vehicle);
        }
    };
}, 300000);

function resetVeh(vehicle: ScriptedVehicle): void {
    vehicle.engine = false;
    vehicle.repair();
    if (vehicle.originalPos && vehicle.originalRotation) {
        vehicle.position = vehicle.originalPos;
        vehicle.rotation = vehicle.originalRotation;
    }
    vehicle.lastExistTime = null;
    vehicle.lastDeathTime = null;
    vehicle.lastDriver = {name: null, player: null, id: null}
}

mp.events.add(RageMP.Enums.Event.PLAYER_EXIT_VEHICLE, (player, vehicle: ScriptedVehicle) => {
    if (vehicle.getOccupants().length === 0) {
        vehicle.lastExistTime = new Date();
    }
});
mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_VEHICLE, (player: Player, vehicle: ScriptedVehicle) => {
    vehicle.lastExistTime = null;
    if (player.seat === -1) {
        vehicle.lastDriver = {
            id: player.customData.dbUser.id,
            name: player.name,
            player
        }
    }
});
mp.events.add("vehicleDeath", (vehicle: ScriptedVehicle) => {
    vehicle.lastExistTime = null;
    vehicle.lastDeathTime = new Date();

    if (!vehicle.respawnTime) {
        setTimeout(() => vehicle.destroy(), 300000);
    }
});
