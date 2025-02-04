import {IJob} from "../IJob";
import {Chat} from "../../Chat/Chat";
import {VehicleHelper} from "../../../Helper/VehicleHelper";
import {AreaHelper, Point} from "../../../Helper/AreaHelper";
import Vector3 = RageMP.Vector3;
import Player = RageMP.Player;
import Colshape = RageMP.Colshape;
import Vehicle = RageMP.Vehicle;
import {addIncomeToPayDay} from "../../Money/PayDayManager";
import {PayDayCategory} from "../../Money/PayDayCategory";
import {getReadableCurrency} from "../../Money/money";
import {logger} from "../../../../Lib/Services/logging/logger";
import {randomNumbers} from "../../../Helper/NumberHelper";

export class Meeresreiniger implements IJob {
    id: number;
    jobStartingPoint: Vector3 = new mp.Vector3(-259.7157, -2678.574, 6.396268);
    name: string = "Meeresreiniger";
    payPerCoordinate: number = 0.33;

    beachBorders: Point[] = [
        new Point(-821, -3641),
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
    endColShape: Colshape;
    spawnPos: Vector3 = new mp.Vector3(-219.810486, -2720.48975, 1.33344078);

    startMarker: Vector3 = new mp.Vector3(-392.6, -3990, 0);

    constructor(id: number) {
        Meeresreiniger.instance = this;
        this.id = id;

        mp.events.add(RageMP.Enums.Event.PLAYER_DEATH, this.removeUnusedTug.bind(this));
        mp.events.add(RageMP.Enums.Event.PLAYER_QUIT, this.removeUnusedTug.bind(this));
        mp.events.add(RageMP.Enums.Event.PLAYER_EXIT_VEHICLE, this.exitVehicle.bind(this));
        mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_COLSHAPE, this.enterColshape.bind(this));

        const {x, y, z} = this.endColShapePosition;
        this.endColShape = mp.colshapes.newSphere(x, y, z, 35);

    }

    enterColshape(player: Player, colshape: Colshape): void {
        if (
            player.vehicle &&
            player.vehicle.isMeeresTug &&
            player.seat === 0 &&

            colshape.isMeeresCol &&
            colshape.player === player
        ) {

            let amount: number = 50;

            if (player.lastMeeresPosition) {
                amount = player.position.subtract(player.lastMeeresPosition as Vector3).length() * this.payPerCoordinate;
            }
            player.lastMeeresPosition = player.position;

            addIncomeToPayDay(player, amount, PayDayCategory.JOB);

            Chat.sendChatNotificationToPlayer(player,
                `Vorarbeiter Alfredo sagt: Wir haben dir ${getReadableCurrency(amount)} auf dein Arbeitskonto gutschrieben. 
                Wir überweisen es dir mit deiner Gehaltsabrechnung (PayDay)`,
                "Gehalt"
            );

            this.getNewMarker(player);
        }

    }

    exitVehicle(player: Player, vehicle: Vehicle): void {
        if (vehicle.isMeeresTug && player.lastSeat === 0 && vehicle.jobStarted) {
            if (this.endColShape.isPointWithin(player.position)) {
                player.position = this.jobStartingPoint;
                this.finishMeeresreiniger(player);
                VehicleHelper.secureDestroyVehicle(vehicle);
            } else {
                player.notify("Du kannst hier nicht von Board gehen!");
                player.putIntoVehicle(vehicle, 0);
            }
        }
    }

    finishMeeresreiniger(player: Player): void {

        if (player.lastMeeresCol) {
            player.lastMeeresCol.destroy();
        }

        player.call("meeresreiniger_remove");
        player.call("meeresreiniger_remove_start");
    }

    removeUnusedTug(player: Player): void {
        if (player.vehicle && player.vehicle.isMeeresTug) {
            VehicleHelper.secureDestroyVehicle(player.vehicle)
        }
        this.finishMeeresreiniger(player)
    }

    canPlayerQuitJob(player: RageMP.Player): boolean {
        return true;
    }

    checkPlayerRequirements(player: RageMP.Player): boolean {
        //@todo add check for boat license #150
        return true;
    }

    sendJobHelp(player: RageMP.Player): void {
        Chat.sendChatNotificationToPlayer(player,
            `Vorarbeiter Alfredo sagt: Schnappe dir einfach den Tug, den wir dir 
            bereitstellen sobald du den Job startest und sammle den Müll an den markierten Stellen!`,
            "Job Hilfe");
    }

    async startJob(player: RageMP.Player): Promise<void> {
        const jobTug = mp.vehicles.new(mp.joaat("tug"), this.spawnPos, {
            heading: 141.525116,
            numberPlate: "Tug",
            dimension: 0
        });

        jobTug.setVariable("isMeeresTug", true);
        jobTug.isMeeresTug = true;
        player.lastMeeresPosition = null;

        await VehicleHelper.ensurePlayerInVehicle(player, jobTug);

        Chat.sendChatNotificationToPlayer(player,"Vorarbeiter Alfredo sagt: Schnappe dir das Boot, und säubere das Meer an den " +
            " markierten Stellen (siehe Blips + Marker)! " +
            "Geld bekommst du wenn du eine Stelle gesäubert hast!");
        Chat.sendChatNotificationToPlayer(player,
            "Vorarbeiter Alfredo sagt: Wenn du den Job beenden/abbrechen willst komm einfach wieder hierher und gehe von Board!");

        player.call("meeresreiniger_create_start", [this.endColShapePosition.x, this.endColShapePosition.y]);

        jobTug.jobStarted = true;

        this.getNewMarker(player, true);
    }

    getNewMarker(player: Player, isStartingMarker: boolean = false): void {
        let markerVec = this.startMarker;
        if (!isStartingMarker) {
            this.removeOldMarker(player);

            do {
                const pos = AreaHelper.getRandomPointInDistance(Point.fromVector(player.position), 600, 100);

                markerVec = new mp.Vector3(pos.x, pos.y, 0);
            } while (
                    AreaHelper.isPointInside(new Point(markerVec.x, markerVec.y), this.beachBorders) ||
                    !AreaHelper.isPointInside(new Point(markerVec.x, markerVec.y), this.inWorld)
                );
        }

        player.call("meeresreiniger_create_next", [markerVec.x, markerVec.y]);

        player.lastMeeresCol = mp.colshapes.newSphere(markerVec.x, markerVec.y, markerVec.z, 20);
        player.lastMeeresCol.player = player;
        player.lastMeeresCol.isMeeresCol = true;
    }

    removeOldMarker(player: Player): void {
        player.call("meeresreiniger_remove");

        if (player.lastMeeresCol) {
            player.lastMeeresCol.destroy();
            player.lastMeeresCol = false;
        }
    }
}
