// @todo: modify to be only in area and to have correct format before sending to client
mp.events.add('playerChat', (player, message) => {
    mp.players.call('addChat', [player, message]);
});

