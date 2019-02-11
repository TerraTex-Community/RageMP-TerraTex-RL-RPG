function isSpecialFunction(func: string) {
    const specialFunctions = [
        "/voice_push_to_talk",
        "/show_cursor",
        "/show_playerlist"
    ];

    return specialFunctions.indexOf(func) !== -1;
}

function executeSpecialFunction(func: string, release: boolean = false) {
    switch(func) {
        case "/voice_push_to_talk":
            setVoiceChat(release);
            break;
        case "/show_cursor":
            toggleCursor();
            break;
        case "/show_playerlist":
            togglePlayerList();
            break;
    }
}

function toggleCursor() {
    mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible);
}

function setVoiceChat(state: boolean) {
    mp.voiceChat.muted = state;
}
