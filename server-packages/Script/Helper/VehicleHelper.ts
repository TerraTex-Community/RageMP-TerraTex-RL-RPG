import Player = RageMP.Player;
import Vehicle = RageMP.Vehicle;
import {wait} from "./Utilities";

export class VehicleHelper {

    static async ensurePlayerInVehicle(player: Player, vehicle: Vehicle, seat = -1) {
        while(player.vehicle !== vehicle) {
            player.putIntoVehicle(vehicle, seat);
            await wait(200);
        }
    }
}
