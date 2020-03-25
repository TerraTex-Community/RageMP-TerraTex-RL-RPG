mp.gui.chat.show(false); //Disables default RageMP Chat

export const chatBox = mp.browsers.new('package://chat/index.html');
chatBox.markAsChat();

export let isChatInputActive: boolean = false;

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
        "chatInputChange": (state: boolean) => {
            isChatInputActive = state;
        }
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
