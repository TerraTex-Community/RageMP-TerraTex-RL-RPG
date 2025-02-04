// add 24h restart at 4
import {scheduleJob} from "node-schedule";
import {int} from "random";
import {changePlayerMoney, getReadableCurrency} from "../Money/money";
import {MoneyCategory} from "../Money/MoneyCategories";
import {Chat} from "../Chat/Chat";
import sendChatAlertToPlayer = Chat.sendChatAlertToPlayer;
import AlertClass = Chat.AlertClass;
import {logger} from "../../../Lib/Services/logging/logger";
import * as a from "array-tools";

// @ts-ignore
scheduleJob({rule: "0 19 * * *", tz: "Europe/Berlin"}, () => {
    giftLotteryMoneyToRandomPlayer(3000);
});

// @ts-ignore
scheduleJob({rule: "0 20 * * *", tz: "Europe/Berlin"}, () => {
    giftLotteryMoneyToRandomPlayer(1500);
});

function giftLotteryMoneyToRandomPlayer(amount: number): void {
    let players = mp.players.toArray();
    if (players.length === 0) return;

    let winner = players[int(0, players.length - 1)];

    while(!winner.getVariable("loggedIn")) {
        players = a.without(players, {name: winner.name});

        if (players.length > 0) {
            winner = players[int(0, players.length - 1)];
        } else {
            return;
        }
    }

    changePlayerMoney(winner, amount, true, MoneyCategory.Lottery, {});

    const msg = `In der heutigen Lottery hat ${winner.name} ${getReadableCurrency(amount)} gewonnen. Das Geld wurde bereits an den Gewinner überwiesen. 
        <br/>Diese Lottery findet täglich um 19 und 20 Uhr statt. Jeder kann gewinnen, unter allen [[Online-]]Bewohnern wird einer zufällig gezogen!`;
    sendChatAlertToPlayer(mp.players.toArray(), AlertClass.success, msg);

    logger.debug(`running lottery | winner: ${winner.name} - ${winner.customData.dbUser.id}`, {
        winnerId: winner.customData.dbUser.id,
        winnerName: winner.name,
        amount
    });
}
// @ts-ignore
scheduleJob({rule: "30 19 * * *", tz: "Europe/Berlin"}, () => {
    const playerNames: string[] = [];
    const playerIds: number[] = [];

    mp.players.forEach(player => {
        if (player.getVariable("loggedIn")) {
            changePlayerMoney(player, 2500, false, MoneyCategory.Other, {msg: "Early Access Bonus"});
            playerNames.push(player.name);
            playerIds.push(player.customData.dbUser.id);
        }
    });

    const msg = `Als Dankeschön für die Nutzung des Servers zu einen solch frühen Zeitpunkt in der Entwicklung (Early Access) 
    - Erhält jeder Spieler, der gerade online ist 2.500$ auf die Hand!`;
    sendChatAlertToPlayer(mp.players.toArray(), AlertClass.success, msg);

    logger.debug(`running Early Access Bonus`, {
        playerNames,
        playerIds,
        amount: 2500
    });
});
