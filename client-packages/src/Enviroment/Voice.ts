import {chatBox} from "../chat";

const use3d = true;
const useAutoVolume = false;

const maxRange = 25.0;

mp.keys.bind(0x73, true, function(): void {
    mp.voiceChat.muted = !!!mp.voiceChat.muted;
    if (mp.voiceChat.muted) {
        chatBox.call("chat:pushPlain", "Voice Chat: <span style='color: red'>deaktiviert</span>");
    } else {
        chatBox.call("chat:pushPlain", "Voice Chat: <span style='color: green'>aktiviert - Du kannst nun reden, bis du den VoiceChat wieder deaktivierst!</span>");
    }
});

const voiceMgr = {
        listeners: [],

        add: (player: PlayerMp): void => {
            this.listeners.push(player);

            // @ts-ignore
            player.isListening = true;
            mp.events.callRemote("add_voice_listener", player);

            if (useAutoVolume) {
                player.voiceAutoVolume = true;
            } else {
                player.voiceVolume = 1.0;
            }

            if (use3d) {
                player.voice3d = true;
            }
        },

        remove: (player: PlayerMp, notify: boolean): void => {
            const idx = this.listeners.indexOf(player);

            if (idx !== -1)
                this.listeners.splice(idx, 1);

            // @ts-ignore
            player.isListening = false;

            if (notify) {
                mp.events.callRemote("remove_voice_listener", player);
            }
        }
    };

mp.events.add("playerQuit", (player) => {
    if (player.isListening) {
        voiceMgr.remove(player, false);
    }
});

setInterval(() => {
    const localPlayer = mp.players.local;
    const localPos = localPlayer.position;

    mp.players.forEachInStreamRange(player => {
        // @ts-ignore
        if (player !== localPlayer && !player.isListening) {
            const playerPos = player.position;
            const dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            if (dist <= maxRange) {
                voiceMgr.add(player);
            }
        }
    });

    voiceMgr.listeners.forEach((player) => {
        if (player.handle !== 0) {
            const playerPos = player.position;
            const dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            if (dist > maxRange) {
                voiceMgr.remove(player, true);
            } else if (!useAutoVolume) {
                player.voiceVolume = 1 - (dist / maxRange);
            }
        } else {
            voiceMgr.remove(player, true);
        }
    });
}, 500);
