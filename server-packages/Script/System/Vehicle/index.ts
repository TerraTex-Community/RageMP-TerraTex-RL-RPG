import "./RookieVehicles";
import "./Commands/PrivateVehicleCommands";
import "./Shop/VehicleShops";


mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_VEHICLE, (player) => {
    player.lastSeat = player.seat;
});
