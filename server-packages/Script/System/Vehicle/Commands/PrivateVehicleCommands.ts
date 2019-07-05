import Player = RageMP.Player;
import {ScriptedVehicle} from "../ScriptedVehicle";
import {DbUser} from "../../../../DB/entities/DbUser";
import {PrivateVehicle, privateVehicles} from "../PrivateVehicles/PrivateVehicle";
import Vehicle = RageMP.Vehicle;
import {HtmlHelper} from "../../../Helper/HtmlHelper";

mp.events.addCommand("park", (player: Player, text: string) => {
    if (!player.vehicle) {
        return;
    }
    const pVeh: ScriptedVehicle = player.vehicle;
    if (!pVeh.privateVehicle) {
        return;
    }
    if (pVeh.privateVehicle.owner.id !== (player.customData.dbUser as DbUser).id) {
        player.notify("~r~Dieses Fahrzeug gehört nicht dir!");
        return;
    }
    const {x, y, z} = pVeh.position;
    const heading = pVeh.heading;

    pVeh.privateVehicle.vehData.positionData = {
        x, y, z, heading
    };

    pVeh.originalPos = pVeh.position;
    pVeh.originalRotation = pVeh.rotation;
    pVeh.originalHeading = pVeh.heading;

    pVeh.privateVehicle.save();

    player.notify("~g~Die SpawnPosition des Fahrzeugs wurde gespeichert!");
});

mp.events.addCommand("carlist", (player: Player) => {
    const vehList: {numberPlate: string, model: string, distance: number|string}[] = [];

    // logical part
    for (const veh of privateVehicles) {
        if (veh.owner.id === (player.customData.dbUser as DbUser).id) {
            vehList.push({
                numberPlate: veh.vehData.id.toString(36),
                model: veh.vehData.model,
                distance: veh.referencedVehicle ?
                    veh.referencedVehicle.position.subtract(player.position).length().toFixed(2) :
                    "abgestellt"
            })
        }
    }

    const table = HtmlHelper.generateTable([
        {title: "Kennzeichen", property: "numberPlate"},
        {title: "Model", property: "model"},
        {title: "Entfernung/Ort", property: "distance"}
    ], vehList);

    player.call("addHTML", [table]);
});
