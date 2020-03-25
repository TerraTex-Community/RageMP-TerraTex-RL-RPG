import {togglePlayerList} from "../../Enviroment/Playerlist";

export function isSpecialFunction(func: string): boolean {
    const specialFunctions = [
        "/voice_push_to_talk",
        "/show_cursor",
        "/show_playerlist"
    ];

    return specialFunctions.indexOf(func) !== -1;
}

export function executeSpecialFunction(func: string, release: boolean = false): void {
    switch(func) {
        case "/voice_push_to_talk":
            setVoiceChat(release);
            break;
        case "/show_cursor":
            toggleCursor();
            break;
        case "/show_playerlist":
            togglePlayerList(release);
            break;
        default: break;
    }
}

export function toggleCursor(): void {
    mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible);
}

export function setVoiceChat(state: boolean): void {
    mp.voiceChat.muted = state;
}
