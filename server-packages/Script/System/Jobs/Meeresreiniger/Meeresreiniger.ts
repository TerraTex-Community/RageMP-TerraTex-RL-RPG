import {IJob} from "../IJob";
import {Chat} from "../../Chat/Chat";
import Vector3 = RageMP.Vector3;
import {VehicleHelper} from "../../../Helper/VehicleHelper";
import Player = RageMP.Player;
import {AreaHelper, Point} from "../../../Helper/AreaHelper";

export class Meeresreiniger implements IJob {
    id: number;
    jobStartingPoint: Vector3 = new mp.Vector3(-259.7157, -2678.574, 6.396268);
    name: string = "Meeresreiniger";

    bearchBorders: Point[] = [
        new Point(-2012, -3476),
        new Point(-4295, 233),
        new Point(-1813, 7986),
        new Point(3862, 6779),
        new Point(4781.9, 3939),
        new Point(2523.5, -3543)
    ];

    inWorld: Point[] = [
        new Point(-5000, -5000),
        new Point(-5000, 5000),
        new Point(5000, 5000),
        new Point(5000, -5000)
    ];


    static instance: Meeresreiniger;

    endColShapePosition: Vector3 = new mp.Vector3(-219.810486, -2720.48975, 1.33344078);
    spawnPos: Vector3 = new mp.Vector3(-219.810486, -2720.48975, 1.33344078);

    startMarker: Vector3 = new mp.Vector3(-392.6, -3990, 0);

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
        const jobTug = mp.vehicles.new("tug", this.spawnPos);
        jobTug.setVariable("isMeeresTug", true);
        jobTug.isMeeresTug = true;

        // @todo: if player is in Tug: delete on disconnect or death
        // @todo create return marker


        VehicleHelper.ensurePlayerInVehicle(player, jobTug);

        player.sendChatMessage("~b~Vorarbeiter Alfredo sagt: Schnappe dir das Boot, und säubere das Meer an den " +
            " markierten Stellen (siehe Blips + Marker)! " +
            "Geld bekommst du wenn du eine Stelle gesäubert hast!");
        player.sendChatMessage(
            "~b~Vorarbeiter Alfredo sagt: Wenn du den Job beenden/abbrechen willst komm einfach wieder hierher und gehe von Board!");

        // @todo: clientside
        player.call("meeresreiniger_create_start", [this.endColShapePosition.x, this.endColShapePosition.y]);

    }

    //@todo: if in colshape allow exit otherwise set back into (except for death then disable job) if is allowed remove markers and blips

    getNewMarker(player: Player, isStartingMarker: boolean = true): void {
        let markerVec = this.startMarker;
        if (!isStartingMarker) {
            do {
                const pos = AreaHelper.getRandomPointInDistance(Point.fromVector(player.position), 400);
                markerVec.x = pos.x;
                markerVec.y = pos.y;
            } while (
                AreaHelper.isPointInside(new Point(markerVec.x, markerVec.y), this.bearchBorders) ||
                !AreaHelper.isPointInside(new Point(markerVec.x, markerVec.y), this.inWorld)
            )
        }

        // @todo create colshape
        // @todo clientside
        player.call("meeresreiniger_create_next", [markerVec.x, markerVec.y]);
    }

    removeOldMarker(player: Player): void {
        // @todo clientside and remove old colshape
        player.call("meeresreiniger_remove");
    }
}
