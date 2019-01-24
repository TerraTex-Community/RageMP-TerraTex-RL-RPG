// const chatbox = mp.browsers.new('package://chat/index.html');
// chatbox.markAsChat();

mp.gui.execute("window.location = 'package://chat/index.html'");

mp.events.add(
    {
        "addChat": (message) => {
            mp.gui.chat.push(`${message}`);
        },
        "addHTML": (message) => {
            mp.gui.execute(`chatAPI.pushPlain("${addSlashes(message)}");`);
        },
        "openChatInput": (preText) => {
            mp.gui.execute(`chatAPI.openChatInput("${preText}");`);
        },
        "simulateChat": (text) => {
            mp.gui.execute(`chatAPI.simulate("${text}");`);
        },
    }
);

function addSlashes(string: string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
