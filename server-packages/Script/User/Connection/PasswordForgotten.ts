import {DbUser} from '../../../DB/entities/DbUser';
import sendMail from '../../../Lib/Data/EMail';
import {ClientHelper} from '../../Helper/ClientHelper';
import * as crypto from "crypto";
import Player = RageMP.Player;

const mailedCodes: any = {};

export async function getHiddenEMail(player: Player) {
    const user = await DbUser.findOne({
        where: {
            nickname: player.name
        }
    });
    if (!user) {
        throw new Error('Login Error: Show PW Forgotten even User does not exist.');
    }

    const email = user.email;
    const emailParts = email.split('@');

    let generatedEmail = emailParts[0].charAt(0);
    generatedEmail += '*'.repeat(emailParts[0].length - 2) + emailParts[0].charAt(emailParts[0].length - 1) + '@';

    const restParts = emailParts[1].split('.');
    let endPart = restParts[restParts.length - 1];


    const rest = restParts.slice(0, restParts.length - 1).join('.');
    generatedEmail += rest.charAt(0);
    generatedEmail += '*'.repeat(rest.length - 2) + rest.charAt(rest.length - 1);
    generatedEmail += '.' + endPart;

    player.call('execute_login_password_forgotten_getEmailHidden_result', [generatedEmail]);
}

export async function sendEmailCode(player: Player) {
    const user = await DbUser.findOne({
        where: {
            nickname: player.name
        }
    });
    if (!user) {
        throw new Error('Login Error: Show PW Forgotten even User does not exist.');
    }

    const code = Math.random().toString(36).substring(2);

    const subject = 'Bestätigungscode für Accountänderung auf dem TerraTex Roleplay Reallife Server';

    const body = `Hallo ${player.name}, <br/>Nutze bitte den folgenden Bestätigungscode um die 
                    Änderung von Accountdaten auf dem Terratex Roleplay Reallife Server durchzuführen: 
                    <br/><br/><pre>${code}</pre><br/>Viele Grüße<br/>dein TerraTex-Team`;

    const result = await sendMail(user.email, subject, body);
    // console.log(result);

    mailedCodes[player.name] = code;
}

export async function checkCodeAndSetPassword(player: Player, pw: string, code: string) {
    if (!mailedCodes[player.name] || mailedCodes[player.name] !== code) {
        player.notify('~r~Der eingegebene Code ist nicht korrekt.');

        ClientHelper.callClientSideFunc(
            player,
            'game.audio.playSoundFrontend',
            -1,
            'MP_IDLE_KICK',
            'HUD_FRONTEND_DEFAULT_SOUNDSET',
            true
        );

        player.call("login_passwordForgotten_setCodeError");
        return;
    }
    mailedCodes[player.name] = false;

    const user = await DbUser.findOne({
        where: {
            nickname: player.name
        }
    });
    if (!user) {
        throw new Error('Login Error: Show PW Forgotten even User does not exist.');
    }

    user.password = crypto.createHash('sha256').update(pw).digest('hex');
    await user.save();

    player.notify('~g~Das Password wurde zurückgesetzt.');
    player.call('login_startLoginProcess', [true, false]);
}
