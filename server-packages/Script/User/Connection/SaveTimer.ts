import {DbUser} from '../../../DB/entities/DbUser';
import {EventHelper} from '../../Helper/EventHelper';
import Player = RageMP.Player;
import {isAdmin} from '../../Admin/AdminHelper';


setInterval(savePlayers, 1800000);

function savePlayers() {
    mp.players.forEach((player: Player) => EventHelper.resolveEventAsync(
        (player: Player): void => {
            if (player.getVariable("loggedIn")) {

                player.customData.dbUser.save().then(() => {
                    console.log(`Datastore: ${player.name} saved.`)
                }).catch((e: any) => console.error(e));
            }
        }, player)
    );
}

mp.events.add(RageMP.Enums.Event.PLAYER_QUIT, (player: Player) => {
    if (player.getVariable("loggedIn")) {
        player.customData.dbUser.save();
    }
});

mp.events.addCommand("saveplayers", (Player: Player) => {
    if (!isAdmin(Player, 4, true)) return;
    savePlayers();
});
