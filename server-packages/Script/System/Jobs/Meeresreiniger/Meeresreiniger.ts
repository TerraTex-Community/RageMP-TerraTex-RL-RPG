import {IJob} from "../IJob";
import {Chat} from "../../Chat/Chat";
import Vector3 = RageMP.Vector3;
import {VehicleHelper} from "../../../Helper/VehicleHelper";

export class Meeresreiniger implements IJob {
    id: number;
    jobStartingPoint: RageMP.Vector3;
    name: string = "Meeresreiniger";

    static instance: Meeresreiniger;

    endColShapePosition: Vector3 = new mp.Vector3(-219.810486, -2720.48975, 1.33344078);
    spawnPos: Vector3 = new mp.Vector3(-219.810486, -2720.48975, 1.33344078);

    constructor(id: number) {
        Meeresreiniger.instance = this;
        this.id = id;
    }

    canPlayerQuitJob(player: RageMP.Player): boolean {
        return false;
    }

    checkPlayerRequirements(player: RageMP.Player): boolean {
        //@todo add check for boat license #150
        return false;
    }

    sendJobHelp(player: RageMP.Player): void {
        Chat.sendChatNotificationToPlayer(player,
            `Vorarbeiter Alfredo sagt: Schnappe dir einfach den Tug, den wir dir 
            bereitstellen sobald du den Job startest und sammle den Müll an den markierten Stellen!`,
            "Job Hilfe");
    }

    startJob(player: RageMP.Player): void {
        const jobTug = mp.vehicles.new("tug", this.jobStartingPoint);
        jobTug.setVariable("isMeeresTug", true);
        jobTug.isMeeresTug = true;

        // @todo: if player is in Tug: delete on disconnect or death


        VehicleHelper.ensurePlayerInVehicle(player, jobTug);

        player.sendChatMessage("~b~Vorarbeiter Alfredo sagt: Schnappe dir das Boot, und säubere das Meer an den " +
            " markierten Stellen (siehe Blips + Marker)! " +
            "Geld bekommst du wenn du eine Stelle gesäubert hast!");
        player.sendChatMessage(
            "~b~Vorarbeiter Alfredo sagt: Wenn du den Job beenden/abbrechen willst komm einfach wieder hierher und gehe von Board!");

    }

    //@todo: if in colshape allow exit otherwise set back into (except for death then disable job)

}
