import {isPlayerLoggedIn} from '../../User/Connection/Login';
import {DbUser} from '../../../DB/entities/DbUser';
import {calculatePayDay} from './PayDayManager';

setInterval(calculatePlayTime, 60000);

function calculatePlayTime() {
    mp.players.forEach((player: RageMP.Player) => {
        if (isPlayerLoggedIn(player)) {
            (<DbUser>player.customData.dbUser).data.playTime++;

            if ((<DbUser>player.customData.dbUser).data.playTime % 60 === 0) {
                calculatePayDay(player);
            }
        }
    });
}
