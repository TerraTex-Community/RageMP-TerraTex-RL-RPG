import {DbUser} from '../../../DB/entities/DbUser';

setInterval(savePlayers, 1800000);

function savePlayers() {
    mp.players.forEach(
        (player: PlayerMp): void => {
            if (player.getVariable("loggedIn")) {
                const dbUser: DbUser = player.getVariable("dbUser");
                dbUser.save().then(() => {
                    console.log(`Datastore: ${dbUser.nickname} saved.`)
                });
            }
        }
    );
}
