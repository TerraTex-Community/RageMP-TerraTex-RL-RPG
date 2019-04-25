import {TerraTexEvents} from "../../Helper/Enums/TerraTexEvents";
import {canPlayerPayByBank, canPlayerPayByHand, changePlayerMoney, getReadableCurrency} from "./money";
import {MoneyCategory} from "./MoneyCategories";
import {getPlayerFromNameOrId} from "../../Helper/PlayerHelper";
import Player = RageMP.Player;


const atmHashes = [
    -1126237515,
    -1700277466,
    506770882,
    -1364697528,
    -455396574,
    -1126237515,
    -870868698
];

mp.events.add(TerraTexEvents.playerClickOnEntity, (
    player: Player, x: number, y: number, upOrDown: string, leftOrRight: string, entityDataJSON: string
) => {
    /**
     * @type {}
     * @property {Vector3} position
     * @property {number} model
     */
    const entityData: any = JSON.parse(entityDataJSON);

    if (atmHashes.indexOf(entityData.model) !== -1 && player.position.subtract(entityData.position).length() <= 5) {
        player.call("openATM");
    }
});

mp.events.add("atm_payInPayOut", (player: Player, type: string, amount: number, txt: string) => {
    if (amount <= 0) {
        player.notify("~r~Ungültiger Betrag!");
        return;
    }
    if (type === "in") {
        if (canPlayerPayByHand(player, amount)) {
            changePlayerMoney(player, -amount, false, MoneyCategory.PayInPayOut, {reason: txt}, null);
            changePlayerMoney(player, amount, true, MoneyCategory.PayInPayOut, {reason: txt}, null);
            player.notify(`~g~${getReadableCurrency(amount)} wurden auf dein Konto eingezahlt.`);
            player.call("updateATM");
        } else {
            player.notify("~r~Du hast nicht genug Geld auf der Hand!");
        }
    } else {
        if (canPlayerPayByBank(player, amount)) {
            changePlayerMoney(player, amount, false, MoneyCategory.PayInPayOut, {reason: txt}, null);
            changePlayerMoney(player, -amount, true, MoneyCategory.PayInPayOut, {reason: txt}, null);
            player.notify(`~g~${getReadableCurrency(amount)} wurden von deinem Konto ausgezahlt.`);
            player.call("updateATM");
        } else {
            player.notify("~r~Du hast nicht genug Geld auf der Bank!");
        }
    }
});

mp.events.add("atm_transfer", (player: Player, amount: number, receiver: string, txt: string) => {
    if (amount <= 0) {
        player.notify("~r~Ungültiger Betrag!");
        return;
    }

    const toPlayer: Player | false = getPlayerFromNameOrId(receiver);
    if (!toPlayer) {
        player.notify("~r~Der Spieler existiert nicht oder ist nicht online!");
        return;
    }

    if (!canPlayerPayByBank(player, amount)) {
        player.notify("~r~Du hast nicht genug Geld auf deinem Bankkonto!");
        return;
    }

    changePlayerMoney(player, -amount, true, MoneyCategory.PlayerToPlayer, {reason: txt}, toPlayer);
    changePlayerMoney(toPlayer, amount, true, MoneyCategory.PlayerToPlayer, {reason: txt}, player);

    player.notify(`~g~${getReadableCurrency(amount)} wurden an ${toPlayer.name} überwiesen.`);
    toPlayer.notify(`~g~${getReadableCurrency(amount)} wurden von ${player.name} an dich überwiesen.`);

    player.call("updateATM");
    toPlayer.call("updateATM");
});
