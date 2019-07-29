import Player = RageMP.Player;
import {DbUser} from "../../../DB/entities/DbUser";
import {MoneyCategory} from "./MoneyCategories";
import {DbUserInventory} from "../../../DB/entities/DbUserInventory";
import {DbMoneyLog} from "../../../DB/entities/DbMoneyLog";
import {anyUserType} from "../../Helper/PlayerHelper";


export function canPlayerPayByBank(player: Player, amount: number): boolean {
    const dbUser: DbUser = player.customData.dbUser;
    return dbUser.inventory.bank >= amount;
}

export function canPlayerPayByHand(player: Player, amount: number): boolean {
    const dbUser: DbUser = player.customData.dbUser;
    return dbUser.inventory.money >= amount;
}

export function payByBankOrHand(
    player: Player, amount: number, category: MoneyCategory, data: any, toPlayer: anyUserType = null
): boolean {
    const dbInventory: DbUserInventory = player.customData.dbUser.inventory;

    if (amount < 0) {
        amount = -amount;
    }

    if (dbInventory.bank < amount && dbInventory.money < amount) {
        return false;
    }

    if (dbInventory.money >= amount) {
        changePlayerMoney(player, -amount, false, category, data, toPlayer);
    } else {
        changePlayerMoney(player, -amount, true, category, data, toPlayer);
        // @todo bank notification
    }

    return true;
}

export function changePlayerMoney(
    player: Player, amount: number, isBank: boolean, category: MoneyCategory, data: any, toPlayer: anyUserType = null
): void {
    const inventory = player.customData.dbUser.inventory;

    if (typeof amount !== "number") {
        throw new Error("Number expected as amount");
    }

    if (isBank) {
        inventory.bank += amount;
        player.setVariable("inventory.bank", inventory.bank);
    } else {
        inventory.money += amount;
        player.setVariable("inventory.money", inventory.money);
    }

    createMoneyLog(player, amount, isBank, category, data, toPlayer);
}

export async function createMoneyLog(
    player: Player, amount: number, isBank: boolean, category: MoneyCategory, data: any, toPlayer: anyUserType = null
): Promise<void> {
    let toUser: DbUser | null | undefined = null;
    if (typeof toPlayer === "string") {
        toUser = await DbUser.findOne({
            where: {
                nickname: toPlayer
            }
        });
    } else if (toPlayer instanceof DbUser) {
        toUser = toPlayer;
    } else if (toPlayer !== null) {
        // in this case toPlayer has to be a Player
        toUser = toPlayer.customData.dbUser;
    }

    const moneyLogEntry = new DbMoneyLog();
    moneyLogEntry.amount = amount;
    moneyLogEntry.category = category;
    moneyLogEntry.description = data;
    if (toUser) {
        moneyLogEntry.to = toUser;
    }
    moneyLogEntry.user = player.customData.dbUser;
    moneyLogEntry.type = isBank ? "bank" : "money";
    await moneyLogEntry.save();
}

export function getPlayerMoney(player: Player): number {
    return player.customData.dbUser.inventory.money;
}

export function getPlayerBank(player: Player): number {
    return player.customData.dbUser.inventory.bank;
}

export function getReadableCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
}
