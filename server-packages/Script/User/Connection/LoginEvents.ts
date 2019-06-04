import {registerPlayer} from "./Register";
import {playerConnect} from "./UserConnect";
import {loginPlayer} from "./Login";
import {EventHelper} from "../../Helper/EventHelper";
import {checkCodeAndSetPassword, getHiddenEMail, sendEmailCode} from "./PasswordForgotten";
import Player = RageMP.Player;
// additional imports for login/save/disconnect Process
import "./SaveTimer";
import {logger} from "../../../Lib/Services/logging/logger";

mp.events.add("execute_login_password_forgotten_getEmailHidden",
    (player: Player) => EventHelper.resolveEventAsync(getHiddenEMail, player));

mp.events.add("login_passwordForgotten_setNewPassword",
    (player: Player, pw: string, code: string) => EventHelper.resolveEventAsync(checkCodeAndSetPassword, player, pw, code));

mp.events.add("login_passwordForgotten_sendCode",
    (player: Player) => EventHelper.resolveEventAsync(sendEmailCode, player));

mp.events.add("execute_login_register",
    (player: Player, data: any) => EventHelper.resolveEventAsync(registerPlayer, player, data));

mp.events.add("execute_login_login",
    (player: Player, password: string) => EventHelper.resolveEventAsync(loginPlayer, player, password));

mp.events.add(RageMP.Enums.Event.PLAYER_READY,
    (player: Player) => playerConnect(player).catch(error => logger.error(error.message, {error})));


