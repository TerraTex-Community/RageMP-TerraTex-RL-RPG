import Vehicle = RageMP.Vehicle;
import {DbUser} from "../../../../DB/entities/DbUser";
import {DbUserVehicle} from "../../../../DB/entities/DbUserVehicle";
import {createScriptedVehicle} from "../ScriptedVehicle";

export const privateVehicles: PrivateVehicle[] = [];

export class PrivateVehicle {
    public referencedVehicle: Vehicle | null = null;
    public owner: DbUser;
    public vehData: DbUserVehicle;

    constructor(owner: DbUser, entry: DbUserVehicle, veh: Vehicle | null = null) {
        this.owner = owner;
        this.referencedVehicle = veh;
        this.vehData = entry;

        privateVehicles.push(this);
        this.runCreation();
    }

    /**
     * Deletes this instance of a PrivateVehicle and removes it from DB
     */
    public async destroy(): Promise<void> {
        const index = privateVehicles.indexOf(this);
        privateVehicles.splice(index, 1);
        await this.vehData.remove();
    }

    /**u
     * Starts to save this instance of PrivateVehicle
     */
    public async save(): Promise<DbUserVehicle> {
        return this.vehData.save();
    }

    private async runCreation(): Promise<void> {
        if (this.referencedVehicle === null) {
            const {x, y, z, heading} = this.vehData.positionData;
            const spawnVector = new mp.Vector3(x,y,z);
            this.referencedVehicle = await createScriptedVehicle(mp.joaat(this.vehData.model), spawnVector, {
                heading,
                numberPlate: "TT-" + this.vehData.id.toString(36)
            }, {
                dbEntry: this.vehData,
                privateVehicle: this,
                autoRespawn: 900000
            });
        }
    }
}
