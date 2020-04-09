import {ItemCategories, ItemShops} from "../Inventory";

export interface IIventoryItem {
    /**
     * Name of Item (will be visible in UI)
     */
    name: string;
    /**
     * Long Description of Item (will be shown as description in UI)
     */
    description: string;
    /**
     * Default Price
     */
    price: number;
    /**
     * In UI you can filter for Categories, this item will be shown in the listed categories
     */
    categories: ItemCategories[];
    /**
     * Item is buyable in listed Shops
     */
    shops: ItemShops[];

    /**
     * Will be executed to use Item. If Item is not useable return false to cancel usage.
     * @param player
     */
    use(player: Player): boolean;
}
