import {getShopTypeBuyMode, getShopTypeIcon, getShopTypeName, ShopPosition, ShopType} from "./ShopPosition";
import {VehicleListItem} from "../VehicleListItem";
import {VEHICLE_LIST} from "../VehicleList";
import Player = RageMP.Player;
import Colshape = RageMP.Colshape;

export const vehicleShops: ShopPosition[] = [
    new ShopPosition(new mp.Vector3(828.7191, -1067.81934, 27.6868439), new mp.Vector3(825.343445, -1060.83252, 28.7931423), 179.990662, ShopType.LandVehicles),
    new ShopPosition(new mp.Vector3(-41.82806, -1109.724, 25.4378), new mp.Vector3(-52.46864, -1111.139, 26.07097), 68.88418, ShopType.LandVehicles),
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

function playerEnterShopColshape(player: Player, shape: Colshape): void {
    if (!shape.isCarDealer) return;

    const shopVehicles: VehicleListItem[] = getShopVehicles(shape.carDealerData);

    player.call("openVehicleShop", [getShopTypeName(shape.carDealerData.shopType), JSON.stringify(shopVehicles)])
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
