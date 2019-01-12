import {DbUser} from '../../../DB/entities/DbUser';
import * as crypto from "crypto";
import {getDatabase} from '../../../Lib/Data/Database';
import {getConnection} from 'typeorm';
import Player = RageMP.Player;

export async function registerPlayer(player: Player, data: any) {
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

    let newUser = new DbUser();

    newUser.serial = player.serial;
    newUser.password = crypto.createHash('sha256').update(parsedData.password).digest('hex');
    newUser.gender = parsedData.gender;
    newUser.email = parsedData.email;
    newUser.forename = parsedData.forename;
    newUser.lastname = parsedData.lastname;
    newUser.nickname = player.name;
    newUser.birthday = new Date(parsedData.birthday);
    newUser.history = parsedData.history;


    console.debug("start creating ", newUser);

    await newUser.save();

    console.info(`Account ${newUser.nickname} (${newUser.id}) created.`);

    player.notify(`Dein Account ${player.name} wurde erstellt. Logge dich nun ein.`);
    player.call("login_startLoginProcess", [true]);
}
