import 'src/login/index';
import 'src/helper/loadHelpers';
import 'src/chat';
import 'src/systems/binding/binding_init';
import 'src/systems/clicksystem';
import 'src/systems/shutdown';
import 'src/Enviroment/index';

// init player defaults
mp.gui.chat.colors = true;
mp.players.local.freezePosition(true);
mp.players.local.alpha = 0;
mp.players.local.position = new mp.Vector3(0,0,200);
mp.players.local.dimension = 1;

mp.keys.bind(0x71, true, function() {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
