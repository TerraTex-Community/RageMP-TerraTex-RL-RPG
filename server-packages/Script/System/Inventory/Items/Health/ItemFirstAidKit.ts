import {IIventoryItem} from "../IIventoryItem";
import {ItemCategories, ItemShops} from "../../Inventory";

export default class FirstAidKit implements IIventoryItem {
    categories: ItemCategories[] = [ItemCategories.Health];
    name: string = "Erste Hilfe Kit";
    description: string = "Füllt den Lebensbalken wieder voll auf.";
    price: number = 1000.00;
    shops: ItemShops[] = [ItemShops.Shop247];

    use(player: RageMP.Player): boolean {
        player.health = 100;
        return true;
    }

}
