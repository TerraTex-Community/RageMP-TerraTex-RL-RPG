import {DbUserVehicle} from "../../../../DB/entities/DbUserVehicle";
import {PrivateVehicle, privateVehicles} from "./PrivateVehicle";
import {ShutdownService} from "../../../../Lib/Services/ShutdownService";
import addToShutdownService = ShutdownService.addToShutdownService;

export async function loadAllPrivateVehicle(): Promise<void> {
    const allPrivateVehicles = await DbUserVehicle.find();

    for (const pVeh of allPrivateVehicles) {
        // tslint:disable-next-line:no-unused-expression
        new PrivateVehicle(pVeh.owner, pVeh);
    }
}

async function saveAllVehicles(): Promise<void> {
    const saves: Promise<any>[] = [];
    for (const vehs of privateVehicles) {
        saves.push(vehs.save());
    }

    if (true == 1) {
        asd();
    }

    await Promise.all(saves);
}
setInterval(saveAllVehicles, 1800000);

addToShutdownService(saveAllVehicles);
