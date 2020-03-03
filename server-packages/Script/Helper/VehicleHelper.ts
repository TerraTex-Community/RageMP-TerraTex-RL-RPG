import Player = RageMP.Player;
import Vehicle = RageMP.Vehicle;
import {wait} from "./Utilities";
import {logger} from "../../Lib/Services/logging/logger";

export class VehicleHelper {

    static async ensurePlayerInVehicle(player: Player, vehicle: Vehicle, seat: number = 0): Promise<void> {
        await wait(500);
        while (player.vehicle !== vehicle) {
            player.putIntoVehicle(vehicle, seat);
            await wait(200);
        }
        console.log(player.seat);
    }

    static secureDestroyVehicle(vehicle: Vehicle): void {
        setTimeout(() => {
            try {
                vehicle.destroy();
            } catch (e) {
                logger.error(e.message, {error: e});
            }
        });
    }

}
