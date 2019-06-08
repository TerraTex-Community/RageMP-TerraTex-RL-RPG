import {DbUser} from "../../../DB/entities/DbUser";
import * as crypto from "crypto";
import Player = RageMP.Player;
import {logger} from "../../../Lib/Services/logging/logger";

export async function registerPlayer(player: Player, data: any): Promise<void> {
    /**
     * @type {}
     * @property {string} forename
     * @property {string} lastname
     * @property {string} password
     * @property {string} email
     * @property {string} history
     * @property {string} gender
     * @property {string} birthday
     */
    const parsedData = JSON.parse(data);

    const newUser = new DbUser();

    newUser.serial = player.serial;
    newUser.password = crypto.createHash("sha256").update(parsedData.password).digest("hex");
    newUser.gender = parsedData.gender;
    newUser.email = parsedData.email;
    newUser.forename = parsedData.forename;
    newUser.lastname = parsedData.lastname;
    newUser.nickname = player.name;
    newUser.birthday = new Date(parsedData.birthday);
    newUser.history = parsedData.history;

    await newUser.save();

    logger.info(`Account ${newUser.nickname} (${newUser.id}) created.`);

    player.notify(`Dein Account ${player.name} wurde erstellt. Logge dich nun ein.`);
    player.call("login_startLoginProcess", [true]);
}
