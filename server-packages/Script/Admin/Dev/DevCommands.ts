import Player = RageMP.Player;
import {isAdmin, isDevServer} from "../AdminHelper";
import {WEAPON_LIST} from "../../System/Weapons/WeaponList";
import {Chat} from "../../System/Chat/Chat";
import {clientLogger} from "../../../Lib/Services/ClientConsole";
import {changePlayerMoney} from "../../System/Money/money";
import {MoneyCategory} from "../../System/Money/MoneyCategories";
import {VehicleHelper} from "../../Helper/VehicleHelper";

mp.events.addCommand('veh', (player: Player, text: string, vehModel: string) => {
    if (!isAdmin(player, 4)) return;
    const vehicle = mp.vehicles.new(mp.joaat(vehModel), player.position.add(new mp.Vector3(0, 0, 1)), {
        heading: rot
    });
    vehicle.numberPlate = `Admin${player.customData.dbUser.id}`;
    VehicleHelper.ensurePlayerInVehicle(player, vehicle);
});

mp.events.addCommand('giveweapons', ((player) => {
    if (!isAdmin(player, 4)) return;

    for (const weaponItem of WEAPON_LIST) {
        player.giveWeapon(weaponItem.hash, 10000);
    }
}));

mp.events.addCommand('debugclick', (player: Player) => {
    player.call('debug_click');
});

mp.events.addCommand('killme', ((player) => {
    if (!isDevServer()) return;

    player.health = 0;
}));

mp.events.addCommand('getpos', ((player) => {
    Chat.sendChatNotificationToPlayer(player, `Deine Aktuelle Position: ${player.position.toString()}`);
    clientLogger.info(player, player.position.toString());
}));

mp.events.addCommand("changemoney", ((player, fullText, money) => {
    if (isDevServer()) {
        changePlayerMoney(player, parseFloat(money), false, MoneyCategory.Other, {reason: "dev changemoney cmd"});
    }
}));
