import "./ChatCommands";
import "./Voice";
import Player = RageMP.Player;

export namespace Chat {
    export enum AlertClass {
        primary = "primary",
        secondary = "secondary",
        success = "success",
        danger = "danger",
        warning = "warning",
        info = "info",
        light = "light",
        dark = "dark",
    }

    mp.events.add("playerChat", (player: Player, message) => {
        message = `${player.getVariable("customChatNameTag")}: ${message}`;
        mp.players.callInRange(player.position, 20, "addChat", [message]);
    });

    export function createChatNotification(message: string, title: string = ""): string {
        let code = "<div class='htmlChatEntry'>";
        if (title.length > 0) {
            code += "<span style='font-weight:bold; text-decoration: underline'>";
            code += title;
            code += "</span><br/>";
        }
        code += message;
        code += "</div>";
        return code;
    }

    export function createChatAlert(alertClass: AlertClass|string, message: string, title: string = ""): string {
        let code = `<div class='alert alert-${alertClass}'>`;
        if (title.length > 0) {
            code += "<span style='font-weight:bold; text-decoration: underline'>";
            code += title;
            code += "</span><br/>";
        }
        code += message;
        code += "</div>";
        return code;
    }

    export function sendChatNotificationToPlayer(player: Player | Player[], message: string, title: string = ""): void {
        const notification = createChatNotification(message, title);

        if (Array.isArray(player)) {
            mp.players.call(player, "addHTML", [notification]);
        } else {
            player.call("addHTML", [notification]);
        }
    }

    export function sendChatAlertToPlayer(player: Player | Player[], alertClass: string, message: string, title: string = ""): void {
        const notification = createChatAlert(alertClass, message, title);
        if (Array.isArray(player)) {
            mp.players.call(player, "addHTML", [notification]);
        } else {
            player.call("addHTML", [notification]);
        }
    }
}
