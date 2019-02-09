import Player = RageMP.Player;
import {PayDayCategory} from './PayDayCategory';
import {DbUser} from '../../../DB/entities/DbUser';
import {changePlayerMoney, getReadableCurrency} from './money';
import {MoneyCategory} from './MoneyCategories';
import {sendChatAlertToPlayer} from '../Chat/Chat';

export function calculatePayDay(player: Player) {
    addDefaultPayDayAmounts(player);

    const payDayData = (<DbUser>player.customData.dbUser).data.paydayData;

    let payDayAmount = 0;
    for (const incomeCategory in payDayData.current.income) {
        payDayAmount += payDayData.current.income[incomeCategory];
    }
    for (const outgoingsCategory in payDayData.current.outgoings) {
        payDayAmount += payDayData.current.outgoings[outgoingsCategory];
    }

    payDayData.last = payDayData.current;

    changePlayerMoney(player, payDayAmount, true, MoneyCategory.PayDay, payDayData.last, null);

    if (payDayAmount >= 0) {
        sendChatAlertToPlayer(
            player,
            'success',
            `PayDay! Dir wurden <strong>${getReadableCurrency(payDayAmount)}</strong> auf dein Bankkonto überwiesen!`,
            'PayDay!'
        );
    } else {
        sendChatAlertToPlayer(
            player,
            'danger',
            `PayDay! Dir wurden <strong>${getReadableCurrency(payDayAmount)}</strong> von deinem Bankkonto abgezogen!`,
            'PayDay!'
        );
    }
}

export function addOutgoingToPayDay(player: Player, amount: number, category: PayDayCategory) {
    if (amount <= 0) {
        throw new Error('Amount on PayDay-Functions have to be positive!');
    }

    // round amount to max two decimals
    amount = Math.floor((amount * 100)) / 100;

    const outgoings = (<DbUser>player.customData.dbUser).data.paydayData.current.outgoings;
    if (!outgoings[category.name]) {
        outgoings[category.name] = -amount;
    } else {
        outgoings[category.name] -= amount;
    }
}

export function addIncomeToPayDay(player: Player, amount: number, category: PayDayCategory) {
    if (amount <= 0) {
        throw new Error('Amount on PayDay-Functions have to be positive!');
    }

    // round amount to max two decimals
    amount = Math.floor((amount * 100)) / 100;

    if (!category.incomeCategory) {
        throw new Error('Only Income Categories are allowed for Income!');
    }

    const income = (<DbUser>player.customData.dbUser).data.paydayData.current.income;
    if (!income[category.name]) {
        income[category.name] = amount;
    } else {
        income[category.name] += amount;
    }

    if (category.tax > 0) {
        const taxAmount = amount * category.tax;
        addOutgoingToPayDay(player, taxAmount, PayDayCategory.Taxes);
    }
}

function addDefaultPayDayAmounts(player: Player) {
    // base salery = 250 + 1 PlayMinute = 0.01
    const addAmount = (<DbUser>player.customData.dbUser).data.playTime / 100;
    addIncomeToPayDay(player, 250 + addAmount, PayDayCategory.Salery);
}
