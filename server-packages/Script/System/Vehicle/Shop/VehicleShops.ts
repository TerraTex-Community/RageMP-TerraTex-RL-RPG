import {getShopTypeBuyMode, getShopTypeIcon, getShopTypeName, ShopPosition, ShopType} from "./ShopPosition";
import {VehicleListItem} from "../VehicleListItem";
import {getVehicleListItemByName, VEHICLE_LIST} from "../VehicleList";
import {payByBankOrHand} from "../../Money/money";
import {MoneyCategory} from "../../Money/MoneyCategories";
import Player = RageMP.Player;
import Colshape = RageMP.Colshape;
import {Chat} from "../../Chat/Chat";
import {createScriptedVehicle} from "../ScriptedVehicle";
import Vector3 = RageMP.Vector3;
import {DbUser} from "../../../../DB/entities/DbUser";
import {DbUserVehicle} from "../../../../DB/entities/DbUserVehicle";
import {VehicleHelper} from "../../../Helper/VehicleHelper";
import {PrivateVehicle} from "../PrivateVehicles/PrivateVehicle";

export const vehicleShops: ShopPosition[] = [
    new ShopPosition(new mp.Vector3(828.7191, -1067.81934, 27.6868439), new mp.Vector3(825.343445, -1060.83252, 28.7931423), 179.990662, ShopType.LandVehicles),
    new ShopPosition(new mp.Vector3(-41.82806, -1109.724, 25.4378), new mp.Vector3(-52.46864, -1111.139, 26.07097), 158.88418, ShopType.LandVehicles),
];


function createShops(): void {
    for (const shop of vehicleShops) {
        console.log("Create Shop: " + shop.position.toString());
        mp.blips.new(getShopTypeIcon(shop.shopType), shop.position, {
            color: 53,
            shortRange: true,
            name: "Autohaus"
        });

        mp.markers.new(1, shop.position, 1, {
            color: [150, 150, 150, 150]
        });

        const shape = mp.colshapes.newSphere(shop.position.x, shop.position.y, shop.position.z, 2);
        const labelPos = shop.position;
        labelPos.z += 0.75;
        mp.labels.new(getShopTypeName(shop.shopType), labelPos, {
            los: true,
            font: 1,
            drawDistance: 15
        });

        shape.isCarDealer = true;
        shape.carDealerData = shop;
    }

    mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_COLSHAPE, playerEnterShopColshape)
}
createShops();

mp.events.add("tryToBuyVehicle", async (player: Player, veh) => {
    const vehListItem: VehicleListItem|false = getVehicleListItemByName(veh);
    const shopPos = getClosestShopPosition(player.position);
    if (!vehListItem || !shopPos) return;

    if (payByBankOrHand(player, vehListItem.price, MoneyCategory.Purchase, {"item": "vehicle", "model": vehListItem.displayName})) {
        const dbEntry = new DbUserVehicle();
        dbEntry.model = vehListItem.displayName;
        dbEntry.owner = player.customData.dbUser;
        await dbEntry.save();
        await dbEntry.reload();

        const vehicle = await createScriptedVehicle(vehListItem.hash, shopPos.spawnPosition, {
            heading: shopPos.spawnHeading,
            numberPlate: "TT-" + dbEntry.id.toString(36)
        }, {
            dbEntry,
            autoRespawn: 900000
        });
        vehicle.privateVehicle = new PrivateVehicle((player.customData.dbUser as DbUser), dbEntry, vehicle);

        await VehicleHelper.ensurePlayerInVehicle(player, vehicle);

        Chat.sendChatAlertToPlayer(player, "success",
            "Du hast erfolgreich ein Fahrzeug gekauft! Es spawned dort, wo du es mit /park abstellst.", "Fahrzeugkauf");
    } else {
        Chat.sendChatAlertToPlayer(player, "alert", "Du hast nicht genug Geld für dieses Fahrzeug!", "Fahrzeugkauf");
    }
});

function playerEnterShopColshape(player: Player, shape: Colshape): void {
    if (!shape.isCarDealer) return;
    if (player.vehicle) return;

    const shopVehicles: VehicleListItem[] = getShopVehicles(shape.carDealerData);

    player.call("openVehicleShop",
        [getShopTypeName(shape.carDealerData.shopType), getShopTypeBuyMode(shape.carDealerData.shopType), JSON.stringify(shopVehicles)])
}

function getShopVehicles(shop: ShopPosition): VehicleListItem[] {
    const vehicles: VehicleListItem[] = [];
    for (const vehicle of VEHICLE_LIST) {
        if (vehicle.buyMode === getShopTypeBuyMode(shop.shopType)) {
            vehicles.push(vehicle);
        }
    }

    return vehicles;
}

function getClosestShopPosition(position: Vector3): ShopPosition|false {
    for (const posDef of vehicleShops) {
        if (posDef.position.subtract(position).length() <= 10) return posDef;
    }
    return false;
}
