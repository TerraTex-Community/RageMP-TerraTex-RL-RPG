import Player = RageMP.Player;
import {getPlayerFromNameOrId} from "../../Helper/PlayerHelper";
import {changePlayerMoney, getPlayerMoney, getReadableCurrency} from "./money";
import {MoneyCategory} from "./MoneyCategories";

mp.events.addCommand("pay", (player: Player, fullText: string, inToPlayer: string, inAmount: string) => {
    const toPlayer: Player|false = getPlayerFromNameOrId(inToPlayer);

    if (!toPlayer) {
        player.notify("~r~Der Spieler existiert nicht!");
        return;
    }

    if (toPlayer.position.subtract(player.position).length() > 5) {
        player.notify("~r~Der Spieler ist nicht in deiner Nähe!");
        return;
    }

    const amount = parseFloat(inAmount);
    if (!amount || amount <= 0) {
        player.notify("~r~Nutzung: /pay [NameOderID] [Betrag]");
        return;
    }

    if (getPlayerMoney(player) < amount) {
        player.notify("~r~Du hast nicht genug Geld auf der Hand!");
        return;
    }

    changePlayerMoney(player, -amount, false, MoneyCategory.PlayerToPlayer, {}, toPlayer);
    changePlayerMoney(toPlayer, amount, false, MoneyCategory.PlayerToPlayer, {}, player);

    player.notify(`~g~Du hast ${toPlayer.name} ${getReadableCurrency(amount)} gegeben!`);
    toPlayer.notify(`~g~Du hast von ${player.name} ${getReadableCurrency(amount)} erhalten!`);
});
