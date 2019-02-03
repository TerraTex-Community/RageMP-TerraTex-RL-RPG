import {TerraTexEvents} from '../../Helper/Enums/TerraTexEvents';
import Player = RageMP.Player;


const atmHashes = [
    -1126237515,
    -1700277466,
    506770882,
    -1364697528,
    -455396574,
    -1126237515,
    -870868698
];

mp.events.add(TerraTexEvents.playerClickOnEntity, (player: Player, x:number, y:number, upOrDown:string, leftOrRight:string, entityData: any) => {
    if (atmHashes.indexOf(entityData.model) !== -1) {
        player.call('openATM');
    }
});
