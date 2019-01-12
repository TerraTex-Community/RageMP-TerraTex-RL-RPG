import {DbUser} from '../../../DB/entities/DbUser';
import {EventHelper} from '../../Helper/EventHelper';
import Player = RageMP.Player;


setInterval(savePlayers, 1800000);

function savePlayers() {
    mp.players.forEach((player: Player) => EventHelper.resolveEventAsync(
        (player: Player): void => {
            if (player.getVariable("loggedIn")) {

                console.log(player.customData.dbUser);

                player.customData.dbUser.save().then(() => {
                    console.log(`Datastore: ${player.customData.nickname} saved.`)
                }).catch((e: any) => console.error(e));
            }
        }, player)
    );
}
