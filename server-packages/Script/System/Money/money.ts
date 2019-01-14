import Player = RageMP.Player;
import {DbUser} from '../../../DB/entities/DbUser';
import {MoneyCategory} from './MoneyCategories';
import {DbUserInventory} from '../../../DB/entities/DbUserInventory';
import {DbMoneyLog} from '../../../DB/entities/DbMoneyLog';

export function canPlayerPayByBank(player: Player, amount: number) {
    const dbUser: DbUser = player.customData.dbUser;
    return dbUser.inventory.bank >= amount;
}

export function canPlayerPayByHand(player: Player, amount: number) {
    const dbUser: DbUser = player.customData.dbUser;
    return dbUser.inventory.money >= amount;
}

export function payByBankOrHand(player: Player, amount: number, category: MoneyCategory, data: any, toPlayer: string|Player|DbUser|null = null) {
    const dbInventory: DbUserInventory = player.customData.dbUser.inventory;

    if (amount < 0)
    {
        amount = -amount;
    }

    if (dbInventory.bank < amount && dbInventory.money < amount)
    {
        return false;
    }

    if (dbInventory.money >= amount)
    {
        // pay with money @todo
        // ChangePlayerMoney(player, amount, false, category, reason, additionalDataAsJson);
        changePlayerMoney(player, amount, false, category, data, toPlayer);
    }
    else
    {
        changePlayerMoney(player, amount, true, category, data, toPlayer);
    }

    return true;
}

export function changePlayerMoney(player: Player, amount: number, isBank: boolean, category: MoneyCategory, data: any, toPlayer: string|Player|DbUser|null = null) {
    const inventory = player.customData.dbUser.inventory;
    if (isBank) {
        inventory.bank += amount;
    } else {
        inventory.money += amount;
    }

    createMoneyLog(player, amount, isBank, category, data, toPlayer);
}

export async function createMoneyLog(player: Player, amount: number, isBank: boolean, category: MoneyCategory, data: any, toPlayer: string|Player|DbUser|null = null) {
    let toUser = null;
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
    moneyLogEntry.to = toUser;
    moneyLogEntry.user = player.customData.dbUser;
    moneyLogEntry.type = isBank ? "bank" : "money";
    await moneyLogEntry.save();
}
