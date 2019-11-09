import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, OneToMany
} from "typeorm";
import {DbUser} from "./DbUser";
import {DbUserInventoryItem} from "./DbUserInventoryItem";
import {getInventoryItemByItemSymbol, IInventoryItem} from "../../Script/User/Inventory/IInventoryItem";

@Entity({
    name: "user_inventory"
})
export class DbUserInventory extends BaseEntity {
    constructor(user: DbUser) {
        super();

        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => DbUser, user => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        persistence: true
    })
    @JoinColumn()
    user: DbUser;

    @OneToMany(type => DbUserInventoryItem, inventoryItem => inventoryItem.userInventory, {
        eager: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        cascade: true
    })
    inventoryItems: DbUserInventoryItem[];

    @Column({
        default: 5000,
        type: "float",
    })
    money: number;

    @Column({
        default: 5000,
        type: "float"
    })
    bank: number;

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;

    async removeInventoryItem(inventoryItem: DbUserInventoryItem): Promise<void> {
        this.inventoryItems = this.inventoryItems.filter(item => item.id !== inventoryItem.id);
        await inventoryItem.remove();
    }

    async addInventoryItem(inventoryItem: IInventoryItem): Promise<void> {
        const itemSymbol = inventoryItem.itemSymbol;

        for (const item of this.inventoryItems) {
            if (item.itemType.itemSymbol === itemSymbol) {
                item.amount++;
                return;
            }
        }
        const itemType = getInventoryItemByItemSymbol(itemSymbol);
        if (!itemType) throw new Error(`ItemType '${itemSymbol}' does not exist.`);

        const newItem = new DbUserInventoryItem();
        newItem.amount = 1;
        newItem.itemType = itemType;
        newItem.userInventory = this;

        this.inventoryItems.push(newItem);
    }

    getAItem(inventoryItem: IInventoryItem): DbUserInventoryItem | false {
        const itemSymbol = inventoryItem.itemSymbol;

        for (const item of this.inventoryItems) {
            if (item.itemType.itemSymbol === itemSymbol) {
                return item;
            }
        }
        return false;
    }

    hasInventoryItem(inventoryItem: IInventoryItem): boolean {
        const item = this.getAItem(inventoryItem);
        return !!(item && item.amount > 0);
    }

    getAmountOfInventoryItem(inventoryItem: IInventoryItem): number {
        const item = this.getAItem(inventoryItem);
        return item ? item.amount : 0;
    }
}
