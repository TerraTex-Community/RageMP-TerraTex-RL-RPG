// mp.gui.execute("window.location = 'package://chat/index.html'");
mp.gui.chat.show(false); //Disables default RageMP Chat

export let chatBox = mp.browsers.new('package://chat/index.html');
chatBox.markAsChat();

mp.events.add(
    {
        "addChat": (message) => {
            mp.gui.chat.push(`${message}`);
        },
        "addHTML": (message) => {
            chatBox.execute(`chatAPI.pushPlain("${addSlashes(message)}");`);
        },
        "openChatInput": (preText) => {
            chatBox.execute(`chatAPI.openChatInput("${preText}");`);
        },
        "simulateChat": (text) => {
            chatBox.execute(`chatAPI.simulate("${text}");`);
        },
    }
);

function addSlashes(txt: string): string {
    return txt
        .replace(/\\/g, "\\\\")
        .replace(/\u0008/g, "\\b")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\f/g, "\\f")
        .replace(/\r/g, "\\r")
        .replace(/'/g, "\\'")
        .replace(/"/g, "\\\"");
}
