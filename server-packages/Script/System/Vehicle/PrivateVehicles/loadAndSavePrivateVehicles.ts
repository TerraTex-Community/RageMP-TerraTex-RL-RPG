import {DbUserVehicle} from "../../../../DB/entities/DbUserVehicle";
import {PrivateVehicle, privateVehicles} from "./PrivateVehicle";
import {ShutdownService} from "../../../../Lib/Services/ShutdownService";
import addToShutdownService = ShutdownService.addToShutdownService;
import {getVehicleListItemByName} from "../VehicleList";
import {logger} from "../../../../Lib/Services/logging/logger";

export async function loadAllPrivateVehicle(): Promise<void> {
    const allPrivateVehicles = await DbUserVehicle.find();

    for (const pVeh of allPrivateVehicles) {
        if (pVeh.positionData.x === 0 && pVeh.positionData.y === 0 && pVeh.positionData.z === 0) {
            const item = getVehicleListItemByName(pVeh.model);
            if (item) {
                pVeh.owner.inventory.money += item.price * 0.8;
                logger.info("Vehicle Deleted", {
                    VehicleId: pVeh.id,
                    VehicleModel: pVeh.model,
                    OwnerId: pVeh.owner.id,
                    OwnerName: pVeh.owner.nickname});
                await pVeh.owner.save();
            }
            pVeh.remove();
        } else {
            // tslint:disable-next-line:no-unused-expression
            new PrivateVehicle(pVeh.owner, pVeh);
        }
    }
}

async function saveAllVehicles(): Promise<void> {
    const saves: Promise<any>[] = [];
    for (const vehs of privateVehicles) {
        saves.push(vehs.save());
    }

    await Promise.all(saves);
}
setInterval(saveAllVehicles, 1800000);

addToShutdownService(saveAllVehicles);
