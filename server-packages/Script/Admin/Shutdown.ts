import Player = RageMP.Player;
import {isAdmin} from "./AdminHelper";
import {ShutdownService} from "../../Lib/Services/ShutdownService";
import {TimeHelper} from "../Helper/TimeHelper";
import Timeout = NodeJS.Timeout;
import * as Moment from "moment";
import {Chat} from "../System/Chat/Chat";
import {scheduleJob} from "node-schedule";

let lastShutDownTimer: null | Timeout = null;
let lastShutDownInterval: null | Timeout = null;
let lastFinishTime: Moment.Moment | null = null;
let lastReason = "";


function sendTimeUntilShutdown(): void {
    if (!lastFinishTime || !lastShutDownInterval) {
        return;
    }

    Moment.relativeTimeThreshold("ss", 0);
    Moment.locale("de");

    Chat.sendChatAlertToPlayer(
        mp.players.toArray(),
        "danger",
        `Der Server wird ${lastFinishTime.fromNow()} heruntergefahren / neugestartet! Grund: ${lastReason}`,
        "Shutdown"
    );

    if (lastFinishTime.diff(Moment(Date.now())) < 20000) {
        clearInterval(lastShutDownInterval);
        lastShutDownInterval = setInterval(sendTimeUntilShutdown, 1000);
    }
}

mp.events.addCommand("shutdown", (player: Player, fullText, timestring: string = "15m", ...reasonA) => {
    if (isAdmin(player, 4, true)) {
        try {

            const reason = reasonA.join(" ");
            lastReason = reason.length > 0 ? reason : "unbekannt";

            if (lastShutDownInterval) {
                clearInterval(lastShutDownInterval);
                lastShutDownInterval = null;
            }

            if (lastShutDownTimer) {
                clearTimeout(lastShutDownTimer);
                lastShutDownTimer = null;
            }

            const time: number = TimeHelper.getTimeFromTimestring(timestring);
            lastFinishTime = Moment(Date.now()).add(time, "ms");

            lastShutDownTimer = setTimeout(() => {
                ShutdownService.shutdownServer(true);
            }, time);

            lastShutDownInterval = setInterval(sendTimeUntilShutdown, time >= 20000 ? 10000 : 1000);


            Moment.relativeTimeThreshold("ss", 0);
            Moment.locale("de");

            Chat.sendChatAlertToPlayer(
                mp.players.toArray(),
                "danger",
                `Der Server wird ${lastFinishTime.fromNow()} heruntergefahren / neugestartet! Grund: ${lastReason}`,
                "Shutdown"
            );

        } catch (e) {
            console.error(e);
            player.notify("~r~Invalid Timestring!");
        }
    }
});

// add 24h restart at 4
scheduleJob(`0 ${TimeHelper.getHoursByUTCHour(4)} * * *`, () => {
    lastReason = "24h Neustart";

    if (lastShutDownInterval) {
        clearInterval(lastShutDownInterval);
        lastShutDownInterval = null;
    }

    if (lastShutDownTimer) {
        clearTimeout(lastShutDownTimer);
        lastShutDownTimer = null;
    }

    const time: number = TimeHelper.getTimeFromTimestring("30m");
    lastFinishTime = Moment(Date.now()).add(time, "ms");

    lastShutDownTimer = setTimeout(() => {
        ShutdownService.shutdownServer(true);
    }, time);

    lastShutDownInterval = setInterval(sendTimeUntilShutdown, 10000);

    Moment.relativeTimeThreshold("ss", 0);
    Moment.locale("de");

    Chat.sendChatAlertToPlayer(
        mp.players.toArray(),
        "danger",
        `Der Server wird ${lastFinishTime.fromNow()} heruntergefahren / neugestartet! Grund: ${lastReason}`,
        "Shutdown"
    );
});
