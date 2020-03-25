let chat =
        {
            size: 0,
            container: null,
            input: null,
            enabled: false,
            active: true
        };

function enableChatInput(enable, defaultInput = "")
{
    mp.events.call("chatInputChange", enable);

    if(chat.active == false
            && enable == true)
        return;

    if (enable != (chat.input != null))
    {
        //chat_printing = enable;

        mp.invoke("focus", enable);

        if (enable)
        {
            chat.input = $("#chat").append('<div><input id="chat_msg" type="text" /></div>').children(":last");
            chat.input.children("input").focus();
            chat.input.children("input").val(defaultInput);
        }
        else
        {
            chat.input.fadeOut('fast', function()
            {
                chat.input.remove();
                chat.input = null;
            });
        }
    }
}


var chatAPI =
        {
            push: (text) =>
            {
                chat.container.prepend("<li>" + text + "</li>");

                chat.size++;

                if (chat.size >= 50)
                {
                    chat.container.children(":last").remove();
                }
            },

            pushPlain: html => {
                chat.container.prepend("<li>" + html + "</li>");

                chat.size++;

                if (chat.size >= 50)
                {
                    chat.container.children(":last").remove();
                }
            },
            openChatInput: preText => {
                setTimeout(() => {
                    enableChatInput(true, preText);
                    event.preventDefault();

                }, 100);
            },
            clear: () =>
            {
                chat.container.html("");
            },

            activate: (toggle) =>
            {
                if (toggle == false
                        && (chat.input != null))
                    enableChatInput(false);

                chat.active = toggle;
            },

            show: (toggle) =>
            {
                if(toggle)
                    $("#chat").show();
                else
                    $("#chat").hide();

                chat.active = toggle;
            },

            simulate: (txt) => {
                if (txt[0] == "/")
                {
                    txt = txt.substr(1);

                    if (txt.length > 0)
                        mp.invoke("command", txt);
                }
                else
                {
                    mp.invoke("chatMessage", txt);
                }
            }
        };
const oldMessages = [];
let lastMessageId = -1;

let api = {"chat:push": chatAPI.push,"chat:pushPlain": chatAPI.pushPlain, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show};

for(let fn in api)
{
    mp.events.add(fn, api[fn]);
}


$(document).ready(function()
{
    chat.container = $("#chat ul#chat_messages");

    $(".ui_element").show();
    chatAPI.push("Multiplayer started and Connected to TerraTex Reallife RPG");

    $("body").keydown(function(event)
    {
        if (event.which === 84 && chat.input == null
                && chat.active)
        {
            enableChatInput(true);
            event.preventDefault();
        }
        else if (event.which === 13 && chat.input != null)
        {

            lastMessageId = -1;

            var value = chat.input.children("input").val();

            if (value.length > 0)
            {
                let isSameMessage = false;
                if (oldMessages.length > 0 && oldMessages[0] === value) {
                    isSameMessage = true;
                }
                if (!isSameMessage) {
                    oldMessages.unshift(value);
                }

                if (value[0] === "/")
                {
                    value = value.substr(1);

                    if (value.length > 0)
                        mp.invoke("command", value.toLowerCase());
                }
                else
                {
                    mp.invoke("chatMessage", value);
                }
            }

            enableChatInput(false);
        } else if(event.which === 38 && chat.input != null) {
            // pressed arrow up
            if (lastMessageId < oldMessages.length - 1) {
                lastMessageId++;
            }
            chat.input.children("input").val(oldMessages[lastMessageId]);

        } else if(event.which === 40 && chat.input != null) {
            // pressed arrow down
            if (lastMessageId > -1) {
                lastMessageId--;
            }
            if (lastMessageId >= 0) {
                chat.input.children("input").val(oldMessages[lastMessageId]);
            } else {
                chat.input.children("input").val("");
            }
        }
    });
});
