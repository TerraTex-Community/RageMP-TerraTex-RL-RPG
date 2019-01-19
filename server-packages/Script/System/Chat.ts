import Player = RageMP.Player;

mp.events.add('playerChat', (player: Player, message) => {
    message = `${player.getVariable("customChatNameTag")}: ${message}`;
    mp.players.call('addChat', [player, message]);
});

