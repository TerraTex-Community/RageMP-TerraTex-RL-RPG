import Vector3 = RageMP.Vector3;
import {VEHICLE_BUY_MODE} from "../VehicleListItem";

export class ShopPosition {
    public position: Vector3;
    public spawnPosition: Vector3;
    public spawnHeading: number;
    public shopType: ShopType;

    constructor(position: Vector3, spawnPosition: Vector3, spawnHeading: number, shopType: ShopType) {
        this.position = position;
        this.spawnPosition = spawnPosition;
        this.spawnHeading = spawnHeading;
        this.shopType = shopType;
    }
}

export enum ShopType {
    LandVehicles,
    AirVehicles,
    WaterVehicles
}

export function getShopTypeName(shopType: ShopType): string {
    switch (shopType) {
        case ShopType.AirVehicles: return "Aircraft Shop";
        case ShopType.LandVehicles: return "Fahrzeug Shop";
        case ShopType.WaterVehicles: return "Boot Shop";
        default: return "unknown";
    }
}

export function getShopTypeIcon(shopType: ShopType): number {
    switch (shopType) {
        case ShopType.AirVehicles: return 307;
        case ShopType.LandVehicles: return 225;
        case ShopType.WaterVehicles: return 427;
        default: return 642;
    }
}
export function getShopTypeBuyMode(shopType: ShopType): number {
    switch (shopType) {
        case ShopType.AirVehicles: return VEHICLE_BUY_MODE.FLIGHT_SHOPS;
        case ShopType.LandVehicles: return VEHICLE_BUY_MODE.VEHICLE_SHOPS;
        case ShopType.WaterVehicles: return VEHICLE_BUY_MODE.BOAT_SHOPS;
        default: return VEHICLE_BUY_MODE.NOT_BUYABLE
    }
}
