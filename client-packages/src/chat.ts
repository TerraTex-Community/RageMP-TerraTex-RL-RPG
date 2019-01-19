// const chatbox = mp.browsers.new('package://chat/index.html');
// chatbox.markAsChat();

mp.gui.execute("window.location = 'package://chat/index.html'");

mp.events.add(
    {
        addChat: (player, message) =>{
            mp.gui.chat.push(`${message}`);
        },
        addHTML: (player, message) =>{
            mp.gui.execute(`chatAPI.pushPlain("${addSlashes(message)}");`);
        }
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
