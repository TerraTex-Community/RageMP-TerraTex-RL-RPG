import {IJob} from "../IJob";
import {Chat} from "../../Chat/Chat";
import {DbUser} from "../../../../DB/entities/DbUser";
import {changePlayerMoney, getReadableCurrency} from "../../Money/money";
import {MoneyCategory} from "../../Money/MoneyCategories";
import Player = RageMP.Player;
import Vehicle = RageMP.Vehicle;
import Vector3 = RageMP.Vector3;
import Colshape = RageMP.Colshape;
import {addIncomeToPayDay} from "../../Money/PayDayManager";
import {PayDayCategory} from "../../Money/PayDayCategory";
import {VehicleHelper} from "../../../Helper/VehicleHelper";
import {logger} from "../../../../Lib/Services/logging/logger";

export class Bergwerksjob implements IJob {
    id: number;
    jobStartingPoint: RageMP.Vector3 = new mp.Vector3(2569.71313, 2719.22656, 42.8665237);

    moneyPerMarker: number = 63.51;

    private readonly marker: RageMP.Vector3[] = [
        new mp.Vector3(2591.796, 2737.56323, 42.00883),
        new mp.Vector3(2630.61279, 2726.9353, 40.8038635),
        new mp.Vector3(2673.475, 2731.62231, 40.46215),
        new mp.Vector3(2736.40283, 2730.073, 41.91521),
        new mp.Vector3(2746.87573, 2754.64063, 42.21877),
        new mp.Vector3(2795.458, 2753.87256, 51.1925),
        new mp.Vector3(2785.9502, 2777.404, 48.0584221),
        new mp.Vector3(2855.82373, 2786.23486, 62.3976936),
        new mp.Vector3(2899.7644, 2734.88721, 71.5269241),
        new mp.Vector3(2919.562, 2699.9314, 72.88576),
        new mp.Vector3(2946.657, 2673.10229, 75.6143646),
        new mp.Vector3(3001.59155, 2704.77026, 76.50134),
        new mp.Vector3(3037.07178, 2710.82544, 74.18918),
        new mp.Vector3(3070.225, 2737.33765, 73.10236),
        new mp.Vector3(3059.36963, 2824.161, 78.11591),
        new mp.Vector3(3023.34082, 2877.26855, 85.4345551),
        new mp.Vector3(3081.394, 2902.74829, 89.89606),
        new mp.Vector3(3085.10718, 2936.95068, 92.17859),
        new mp.Vector3(3068.39, 2976.032, 91.68142),
        new mp.Vector3(3034.7937, 3020.83862, 89.85893),
        new mp.Vector3(3072.235, 3019.17456, 104.386375),
        new mp.Vector3(3049.22632, 3036.87744, 97.36492),
        new mp.Vector3(2997.62476, 3023.15283, 88.39284),
        new mp.Vector3(2980.29858, 2991.29272, 86.98883),
        new mp.Vector3(3017.391, 3003.03638, 84.06831),
        new mp.Vector3(3053.156, 2994.59448, 82.6704254),
        new mp.Vector3(3067.528, 2952.1377, 79.88512),
        new mp.Vector3(3059.85327, 2901.05029, 80.2277451),
        new mp.Vector3(3054.28784, 2944.72583, 79.6872253),
        new mp.Vector3(3043.54321, 2984.46484, 84.42695),
        new mp.Vector3(2964.816, 2964.81958, 89.16786),
        new mp.Vector3(2937.9353, 2913.66724, 87.82584),
        new mp.Vector3(2889.27637, 2878.37842, 80.00764),
        new mp.Vector3(2877.04565, 2887.29761, 84.9944),
        new mp.Vector3(2855.16064, 2924.79858, 72.9354553),
        new mp.Vector3(2800.85522, 2954.78369, 55.12195),
        new mp.Vector3(2678.19263, 2988.524, 35.21981),
        new mp.Vector3(2660.86, 2927.33862, 37.79349),
        new mp.Vector3(2628.44385, 2880.90747, 35.9514),
        new mp.Vector3(2596.236, 2844.29736, 34.0122757),
        new mp.Vector3(2694.53735, 2831.20947, 41.6051),
        new mp.Vector3(2711.821, 2866.83228, 37.1350746),
        new mp.Vector3(2726.41479, 2879.55469, 39.76519),
        new mp.Vector3(2739.66, 2901.32666, 36.39648),
        new mp.Vector3(2786.90039, 2910.39844, 37.6707954),
        new mp.Vector3(2816.78687, 2861.30054, 40.9834976),
        new mp.Vector3(2828.89478, 2838.75366, 46.6509247),
        new mp.Vector3(2852.86768, 2845.824, 52.7288),
        new mp.Vector3(2857.67969, 2869.829, 56.6553841),
        new mp.Vector3(2875.80151, 2852.162, 61.4612045),
        new mp.Vector3(2905.75635, 2867.57153, 65.70469),
        new mp.Vector3(2994.31616, 2917.74756, 60.3559952),
        new mp.Vector3(3018.65942, 2914.85815, 63.15963),
        new mp.Vector3(3023.19214, 2952.29883, 66.04075),
        new mp.Vector3(2982.43872, 2929.16382, 69.98812),
        new mp.Vector3(2976.305, 2909.55078, 70.43414),
        new mp.Vector3(2957.14722, 2902.36084, 71.61585),
        new mp.Vector3(2961.60767, 2924.80835, 74.74473),
        new mp.Vector3(2990.545, 2957.282, 77.88109),
        new mp.Vector3(3023.37646, 2992.54688, 71.53562),
        new mp.Vector3(3044.19531, 2957.922, 70.5664444),
        new mp.Vector3(3040.91138, 2916.39185, 70.36528),
        new mp.Vector3(3026.03687, 2904.70068, 73.07895),
        new mp.Vector3(3017.83545, 2868.77637, 72.96819),
        new mp.Vector3(3037.59961, 2822.25439, 70.88995),
        new mp.Vector3(3060.85, 2747.87134, 63.76748),
        new mp.Vector3(3051.02734, 2723.18945, 62.75682),
        new mp.Vector3(3038.69019, 2717.339, 62.76705),
        new mp.Vector3(2993.06567, 2708.99731, 63.6857643),
        new mp.Vector3(2984.87085, 2688.71875, 64.29347),
        new mp.Vector3(2958.81982, 2675.33569, 63.6390457),
        new mp.Vector3(2948.29688, 2689.71118, 64.923645),
        new mp.Vector3(2927.858, 2714.25073, 63.63371),
        new mp.Vector3(2912.299, 2743.14063, 62.2544975),
        new mp.Vector3(2885.29565, 2786.32031, 56.22697),
        new mp.Vector3(2894.42847, 2773.60425, 53.7781868),
        new mp.Vector3(2928.37158, 2746.49121, 53.33328),
        new mp.Vector3(2952.68457, 2698.15649, 54.645607),
        new mp.Vector3(2993.06, 2721.231, 56.52143),
        new mp.Vector3(2986.07837, 2745.466, 55.25537),
        new mp.Vector3(3027.47168, 2759.44556, 55.9012032),
        new mp.Vector3(2994.57373, 2807.91016, 55.35803),
        new mp.Vector3(2985.54736, 2859.2998, 59.1138535),
        new mp.Vector3(3013.11426, 2810.097, 65.03325),
        new mp.Vector3(2925.35547, 2856.046, 55.6107445),
        new mp.Vector3(2905.41382, 2829.79419, 54.02548),
        new mp.Vector3(2951.795, 2847.88672, 46.8833466),
        new mp.Vector3(2984.25342, 2810.5835, 43.69481),
        new mp.Vector3(2996.07471, 2758.91064, 42.48086),
        new mp.Vector3(2961.89282, 2732.55347, 44.9579468),
        new mp.Vector3(2972.3728, 2769.36743, 39.0241623),
        new mp.Vector3(2934.80957, 2816.78687, 44.04231),
        new mp.Vector3(2846.242, 2816.87183, 53.33064),
        new mp.Vector3(2778.59717, 2847.69141, 35.4858131),
        new mp.Vector3(2628.164, 2760.59961, 35.8724365),
        new mp.Vector3(2555.69824, 2773.52881, 39.3047)
    ];

    private readonly alreadyUsedPositions: bergwerkPlayerMarkerList = {};

    name: string = "Bergwerksarbeiter";
    static instance: Bergwerksjob;

    constructor(id: number) {
        Bergwerksjob.instance = this;
        this.id = id;

        for (const markerPosition of this.marker) {
            const {x, y, z} = markerPosition;
            const shape = mp.colshapes.newSphere(x, y, z, 5);
            shape.isBergwerksColshape = true;
        }

        mp.events.add(RageMP.Enums.Event.PLAYER_EXIT_VEHICLE, this.onPlayerLeaveVehicle.bind(this));
        mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_COLSHAPE, this.onPlayerEnterColshape.bind(this));
        mp.events.add(RageMP.Enums.Event.PLAYER_START_ENTER_VEHICLE, this.onPlayerEnterVehicle);
    }

    onPlayerLeaveVehicle(player: Player, vehicle: Vehicle): void {
        if (!vehicle.isBergwerkBulldozer) {
            return;
        }

        if (player.seat !== 0) {
            return;
        }

        Chat.sendChatNotificationToPlayer(player,
            `Vorarbeiter Karl sagt: Da du offentsichtlich den Bulldozer nicht mehr brauchst, haben wir ihn weggeräumt. 
                        Falls du ihn doch noch brauchst, hol dir einen neuen!`,
            "Job Information"
        );

        player.call("job_bergwerk_destroyAllMarkers");

        vehicle.destroy();
    }

    onPlayerEnterColshape(player: Player, shape: Colshape): void {

        if (!shape.isBergwerksColshape) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (!player.vehicle.isBergwerkBulldozer) {
            return;
        }

        const markers = this.alreadyUsedPositions[(<DbUser>player.customData.dbUser).id];

        let found = false;

        for (const index in markers) {
            if (markers[index].subtract(player.position).length() >= 5) {
                continue;
            }

            // @ts-ignore
            markers.splice(index, 1);
            found = true;
        }

        if (!found) {
            return;
        }

        player.call("job_bergwerk_destroyMarker");

        const perMarkerMoney = this.moneyPerMarker / 2;
        changePlayerMoney(player, perMarkerMoney, false, MoneyCategory.Job, {
            job: "Bergwerksjob"
        });

        Chat.sendChatNotificationToPlayer(player,
            `Hier ${getReadableCurrency(perMarkerMoney)} als kleines Taschengeld für deine Bemühungen!`);

        if (markers.length === 0) {
            try {
                player.removeFromVehicle();

                delete this.alreadyUsedPositions[(<DbUser>player.customData.dbUser).id];

                const money = this.marker.length * this.moneyPerMarker / 2;
                addIncomeToPayDay(player, money, PayDayCategory.JOB);

                Chat.sendChatNotificationToPlayer(player,
                    `Dein Gehalt von ${getReadableCurrency(money)} bekommst du zu deinem PayDay!`);

            } catch (e) {
                logger.error("error occured in bergwerksjob finish", {error: e});
            }

        } else {

            Chat.sendChatNotificationToPlayer(player, `Sehr gut! Dann fehlen ja nur noch ${markers.length} Positionen.`);
        }
    }


    canPlayerQuitJob(player: RageMP.Player): boolean {
        return true;
    }

    checkPlayerRequirements(player: RageMP.Player): boolean {
        // @todo: add licence check after #0000150
        return true;
    }

    sendJobHelp(player: RageMP.Player): void {
        Chat.sendChatNotificationToPlayer(player,
            `Vorarbeiter Karl sagt: Schnappe dir einfach den Bulldozer, den wir dir 
            bereitstellen sobald du den Job startest und prüfe den Steinbruch auf Probleme an den markierten Stellen!`,
            "Job Hilfe");
    }

    onPlayerEnterVehicle(player: Player, vehicle: Vehicle, seat: number): void {
        if (seat !== 0) {
            return;
        }
        if (!vehicle.isBergwerkBulldozer) {
            return;
        }
        if (player === vehicle.driver) {
            return;
        }

        player.notify("~r~Du darfst dieses Fahrzeug nicht fahren!");

        // because of non context binding event will set different context with cancel property
        // @ts-ignore
        this.cancel = true;
    }

    async startJob(player: RageMP.Player): Promise<void> {
        const bulldozer = mp.vehicles.new(
            RageMP.Hashes.Vehicle.BULLDOZER,
            new mp.Vector3(2587.20581, 2722.64185, 42.2129631)
        );

        await VehicleHelper.ensurePlayerInVehicle(player, bulldozer, 0);

        bulldozer.isBergwerkBulldozer = true;
        bulldozer.driver = player;

        Chat.sendChatNotificationToPlayer(player,
            `Vorarbeiter Karl sagt: Schnappe dir den Bulldozer, und prüfe den 
                    Steinbruch auf Probleme an den markierten Stellen (siehe Blips + Marker)!
                    Gehalt bekommst du wenn du alle Stellen geprüft hast 
                    (einen kleinen Bonus unter uns, geb ich dir auch bei jeder Stelle ;-))!`,
            "Job Information"
        );


        if (!this.alreadyUsedPositions[(<DbUser>player.customData.dbUser).id]) {
            this.alreadyUsedPositions[(<DbUser>player.customData.dbUser).id] = [...this.marker];
        }

        player.call("job_bergwerk_createMarker", [this.alreadyUsedPositions[(<DbUser>player.customData.dbUser).id]]);
    }
}

type bergwerkPlayerMarkerList = {
    [key: number]: Vector3[];
}

