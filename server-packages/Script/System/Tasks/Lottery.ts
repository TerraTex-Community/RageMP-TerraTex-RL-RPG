// add 24h restart at 4
import {scheduleJob} from "node-schedule";
import {TimeHelper} from "../../Helper/TimeHelper";
import {int} from "random";
import {changePlayerMoney, getReadableCurrency} from "../Money/money";
import {MoneyCategory} from "../Money/MoneyCategories";
import {Chat} from "../Chat/Chat";
import sendChatAlertToPlayer = Chat.sendChatAlertToPlayer;
import AlertClass = Chat.AlertClass;
import {logger} from "../../../Lib/Services/logging/logger";

scheduleJob(`0 ${TimeHelper.getHoursByUTCHour(19)} * * *`, () => {
    giftLotteryMoneyToRandomPlayer(3000);
});
scheduleJob(`0 ${TimeHelper.getHoursByUTCHour(20)} * * *`, () => {
    giftLotteryMoneyToRandomPlayer(1500);
});

function giftLotteryMoneyToRandomPlayer(amount: number): void {
    const players = mp.players.toArray();
    const winner = players[int(0, players.length - 1)];

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
