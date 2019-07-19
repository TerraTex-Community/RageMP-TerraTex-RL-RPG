import Player = RageMP.Player;
import {isAdmin} from "./AdminHelper";
import {ShutdownService} from "../../Lib/Services/ShutdownService";
import {TimeHelper} from "../Helper/TimeHelper";
import Timeout = NodeJS.Timeout;
import Moment from "moment";
import {Chat} from "../System/Chat/Chat";
import {scheduleJob} from "node-schedule";
import {logger} from "../../Lib/Services/logging/logger";
import {registerServerCommand} from "../../Lib/Services/ServerConsole";

let lastShutDownTimer: null | Timeout = null;
let lastShutDownInterval: null | Timeout = null;
let lastFinishTime: Moment.Moment | null = null;
let lastReason: string = "";


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

registerServerCommand("shutdown", (timestring: string = "15m", ...reasonA) => {
    try {
        startShutDownCmd(timestring, reasonA);
    } catch (e) {
        console.error("\x1b[31mInvalid Timestring!");
        logger.error(e.message, {e});
    }
});

mp.events.addCommand("shutdown", (player: Player, fullText, timestring: string = "15m", ...reasonA) => {
    if (isAdmin(player, 4, true)) {
        try {
            startShutDownCmd(timestring, reasonA);
        } catch (e) {
            logger.error(e.message, {e});
            player.notify("~r~Invalid Timestring!");
        }
    }
});

function startShutDownCmd(timestring: string, reasonA: string[]): void {
    const reason: string = reasonA.join(" ");
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
}

// add 24h restart at 4
// @ts-ignore
scheduleJob({rule: "0 4 * * *", tz: "Europe/Berlin"}, () => {
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
