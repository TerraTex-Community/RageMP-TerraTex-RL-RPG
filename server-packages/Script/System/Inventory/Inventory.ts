export type InventoryDef = {
    [inventoryItemClassName: string]: ItemInventoryData
}

export interface ItemInventoryData {
    amount: number;
}

export enum ItemCategories {
    Health
}

export enum ItemShops {
    Shop247
}
