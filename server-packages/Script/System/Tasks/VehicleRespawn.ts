import {scheduleJob} from "node-schedule";
import {ScriptedVehicle} from "../Vehicle/ScriptedVehicle";
import VehicleSeat = RageMP.Enums.VehicleSeat;
import Player = RageMP.Player;

scheduleJob("0 0/5 0 ? *", () => {
    mp.vehicles.forEach((vehicle: ScriptedVehicle) => {
        if (vehicle.idleRespawnTime
            && vehicle.idleRespawnTime > 0
            && vehicle.lastExistTime
            && new Date().getTime() - vehicle.lastExistTime.getTime() > vehicle.idleRespawnTime
            && !vehicle.getOccupant(VehicleSeat.DRIVER)
            && vehicle.originalPos && vehicle.originalRotation
        ) {
            vehicle.engine = false;
            vehicle.repair();
            vehicle.position = vehicle.originalPos;
            vehicle.rotation = vehicle.originalRotation;
        }

        if (vehicle.respawnTime
            && vehicle.respawnTime > 0
            && vehicle.lastDeathTime
            && new Date().getTime() - vehicle.lastDeathTime.getTime() > vehicle.respawnTime
            && !vehicle.getOccupant(VehicleSeat.DRIVER)
            && vehicle.originalPos && vehicle.originalRotation
            && vehicle.dead
        ) {
            vehicle.spawn(vehicle.originalPos, 0);
            vehicle.engine = false;
            vehicle.repair();
            vehicle.position = vehicle.originalPos;
            vehicle.rotation = vehicle.originalRotation;
        }
    });
});

mp.events.add(RageMP.Enums.Event.PLAYER_EXIT_VEHICLE, (player, vehicle: ScriptedVehicle) => {
    vehicle.lastExistTime = new Date();
});
mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_VEHICLE, (player: Player, vehicle: ScriptedVehicle) => {
    vehicle.lastExistTime = null;
    vehicle.lastDriver = {
        id: player.customData.dbUser.id,
        name: player.name,
        player
    }
});
mp.events.add("vehicleDeath", (vehicle: ScriptedVehicle) => {
    vehicle.lastExistTime = null;
    vehicle.lastDeathTime = new Date();

    if (!vehicle.respawnTime) {
        setTimeout(() => vehicle.destroy(), 300000);
    }
});
