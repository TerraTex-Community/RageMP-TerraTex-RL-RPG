let chat =
{
	size: 0,
	container: null,
	input: null,
	enabled: false,
	active: true
};

function enableChatInput(enable)
{
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
	push: text =>
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
	}
};

$(document).ready(function()
{
	chat.container = $("#chat ul#chat_messages");
	
    $(".ui_element").show();
    chatAPI.push("Multiplayer started and Connected to TerraTex Reallife RPG");

    $("body").keydown(function(event)
	{
        if (event.which == 84 && chat.input == null
			&& chat.active == true)
		{
            enableChatInput(true);
            event.preventDefault();
        } 
		else if (event.which == 13 && chat.input != null)
		{
            var value = chat.input.children("input").val();

            if (value.length > 0) 
			{
                if (value[0] == "/")
				{
                    value = value.substr(1);

                    if (value.length > 0)
                        mp.invoke("command", value);
                }
				else
				{
                    mp.invoke("chatMessage", value);
                }
            }

            enableChatInput(false);
        }
    });
});
