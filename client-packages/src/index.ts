import './login/index';
import './helper/loadHelpers';
import './chat';
import './shops';
import './systems/binding/binding_init';
import './systems/clicksystem';
import './systems/shutdown';
import './Enviroment/index';
import {logger} from "./ClientConsole/Logger";



// init player defaults
mp.gui.chat.colors = true;
mp.players.local.freezePosition(true);
mp.players.local.alpha = 0;
mp.players.local.position = new mp.Vector3(0,0,200);

logger.info("Startet TerraTex Client");
