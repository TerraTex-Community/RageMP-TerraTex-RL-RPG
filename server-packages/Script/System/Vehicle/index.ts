import "./RookieVehicles";
import "./Commands";
import "./Shop/VehicleShops";
import "./EngineState";


mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_VEHICLE, (player) => {
    player.lastSeat = player.seat;
});
