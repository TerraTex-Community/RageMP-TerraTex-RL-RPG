import HashOrString = RageMP.HashOrString;
import Vector3 = RageMP.Vector3;
import RGB = RageMP.RGB;
import Array2d = RageMP.Array2d;
import Vehicle = RageMP.Vehicle;
import Player = RageMP.Player;

export async function createScriptedVehicle(
    model: RageMP.Hashes.Vehicle | HashOrString, position: Vector3,
    options: VehicleOptions,
    scriptOptions: ScriptedVehicleOptions
): Promise<Vehicle> {
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
    vehicle.originalRotation = vehicle.rotation;

    if (scriptOptions.autoRespawn) {
        vehicle.respawnTime = typeof scriptOptions.autoRespawn === "number" ? scriptOptions.autoRespawn : 600000;
    }
    if (scriptOptions.idleRespawn) {
        vehicle.idleRespawnTime = typeof scriptOptions.idleRespawn === "number" ? scriptOptions.idleRespawn : 600000;
    }

    vehicle.engine = false;
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
    ownerId?: number;
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
    respawnTime?: number|undefined;
    idleRespawnTime?: number|undefined;
    lastDeathTime?: Date|null;
    lastExistTime?: Date|null;
    lastDriver?: {name: string|null, id: number|null, player: Player|null },
    originalOptions?: VehicleOptions,
    originalPos?: Vector3,
    originalRotation?: Vector3,
    ownerId?: number|undefined
}
