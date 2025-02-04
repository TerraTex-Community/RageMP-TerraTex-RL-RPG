import HashOrString = RageMP.HashOrString;
import Vector3 = RageMP.Vector3;
import RGB = RageMP.RGB;
import Array2d = RageMP.Array2d;
import Vehicle = RageMP.Vehicle;
import Player = RageMP.Player;
import {DbUserVehicle} from "../../../DB/entities/DbUserVehicle";
import {PrivateVehicle} from "./PrivateVehicles/PrivateVehicle";

export async function createScriptedVehicle(
    model: RageMP.Hashes.Vehicle | HashOrString, position: Vector3,
    options: VehicleOptions,
    scriptOptions: ScriptedVehicleOptions
): Promise<ScriptedVehicle> {
    const vehicle: ScriptedVehicle = mp.vehicles.new(model, position, options);
    vehicle.originalPos = position;
    vehicle.originalOptions = options;
    vehicle.lastDriver = {
        name: null,
        id: null,
        player: null,
    };
    vehicle.lastExistTime = null;
    vehicle.lastDeathTime = null;
    vehicle.originalHeading = vehicle.heading;
    vehicle.originalRotation = vehicle.rotation;
    vehicle.vehDb = scriptOptions.dbEntry;
    vehicle.privateVehicle = scriptOptions.privateVehicle;

    if (scriptOptions.autoRespawn) {
        vehicle.respawnTime = typeof scriptOptions.autoRespawn === "number" ? scriptOptions.autoRespawn : 600000;
    }
    if (scriptOptions.idleRespawn) {
        vehicle.idleRespawnTime = typeof scriptOptions.idleRespawn === "number" ? scriptOptions.idleRespawn : 600000;
    }

    vehicle.engine = false;

    if (options.numberPlate) {
        vehicle.numberPlate = options.numberPlate;
        vehicle.numberPlateType = 3;
    }
    return vehicle;
}

interface ScriptedVehicleOptions {
    /**
     * is autorespawning? value in ms if true default = 10 min / 600s
     */
    autoRespawn?: number|boolean;
    /**
     * is idlerespawning? value in ms if true default = 10 min / 600s
     */
    idleRespawn?: number|boolean;
    privateVehicle?: PrivateVehicle;
    dbEntry?: DbUserVehicle;
}

export interface VehicleOptions {
    alpha?: number, color?: [Array2d, Array2d] | [RGB, RGB],
    dimension?: number,
    engine?: boolean,
    heading?: number,
    locked?: boolean,
    numberPlate?: string
}

export interface ScriptedVehicle extends Vehicle {
    respawnTime?: number;
    idleRespawnTime?: number;
    lastDeathTime?: Date|null;
    lastExistTime?: Date|null;
    lastDriver?: {name: string|null, id: number|null, player: Player|null },
    originalOptions?: VehicleOptions,
    originalPos?: Vector3,
    originalRotation?: Vector3,
    originalHeading?: number,
    privateVehicle?: PrivateVehicle,
    vehDb?: DbUserVehicle
}
