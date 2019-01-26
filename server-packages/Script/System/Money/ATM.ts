import {TerraTexEvents} from '../../Helper/Enums/TerraTexEvents';


mp.events.add(TerraTexEvents.PlayerClick, (player, ...args) => {
    console.log(JSON.stringify(args));
});
