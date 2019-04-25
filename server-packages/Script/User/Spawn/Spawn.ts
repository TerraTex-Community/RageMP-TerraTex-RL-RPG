import {ClientHelper} from '../../Helper/ClientHelper';
import Vector3 = RageMP.Vector3;
import Player = RageMP.Player;
import {DbUser} from '../../../DB/entities/DbUser';


export async function spawnPlayer(player: Player): Promise<void> {
    ClientHelper.callClientSideFunc(player, "players.local.freezePosition", false);
    player.dimension = 0;
    player.alpha = 255;


    setSpawnPlayerSkin(player);
    const spawnPos: Vector3 = getSpawnPosition(player);

    if (player.customData.dbUser.data.jailTime > 0) {
        // JailManager.SetPlayerJail(player);
        //     @todo reimplement
    }
    // else if (OfflineSpawnSave.HasPlayerOfflinePositionStored(player))
    // {
    //     AntiTeleportHack.SetPlayerSavePosition(player, OfflineSpawnSave.GetPlayerOfflinePosition(player));
    //     OfflineSpawnSave.RemovePlayerOfflinePosition(player);
    //     resetOfflineStats(player);
    // }
    else {
        player.position = spawnPos;
        player.spawn(spawnPos);
        // resetOfflineStats(player);
    }
    player.health = 100;
}

function setSpawnPlayerSkin(player: Player): void {
    const dbUser: DbUser = player.customData.dbUser;
    const skin = dbUser.data.skin;

    if (skin === 0) {
        if (dbUser.gender === "female") {
            player.model = RageMP.Hashes.Ped.IG_ABIGAIL;
        } else {
            player.model = RageMP.Hashes.Ped.PLAYER_ZERO;
        }
    } else {
        player.model = skin;
    }
}

function resetOfflineStats(player: Player): void {
    // @todo

    // string offlineState = (string) player.getData("LastOfflineState");
    // if (offlineState.Length > 0)
    // {
    //     JObject lastStateO = JObject.Parse(offlineState);
    //     player.health = (int) lastStateO["health"];
    //     player.armor = (int) lastStateO["armor"];
    //     player.wantedLevel = (int) lastStateO["wantedLevel"];
    //
    //     JArray weapons = (JArray) lastStateO["weapons"];
    //     foreach (JToken weapon in weapons)
    //     {
    //         WeaponHash weaponHash = (WeaponHash) (int) weapon["weapon"];
    //         int ammo = (int) weapon["ammo"];
    //         WeaponTint weaponTint = (WeaponTint) (int) weapon["tint"];
    //         JArray components = (JArray) weapon["components"];
    //
    //         TTRPG.Api.givePlayerWeapon(player, weaponHash, ammo, false);
    //         TTRPG.Api.setPlayerWeaponTint(player, weaponHash, weaponTint);
    //
    //         foreach (int componentId in components)
    //         {
    //             TTRPG.Api.givePlayerWeaponComponent(player, weaponHash, (WeaponComponent) componentId);
    //         }
    //     }
    //
    //     player.setData("LastOfflineState", "");
    // }
}

export function getSpawnPosition(player: Player): Vector3 {
    // @todo:

    // List<Apartment> apartments = (List<Apartment>) player.getData("UserApartments");
    //
    // if (apartments.Count <= 0) return new Vector3(259.8162, -1204.156, 29.28907);
    //
    // Dictionary<string, dynamic> spawn =
    //     JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(
    //         (string) player.getSyncedData("SpawnSelect"));
    //
    // if (spawn.ContainsKey("type") && ((string) spawn["type"]).Equals("apartment"))
    // {
    //     int id = (int) spawn["id"];
    //     Apartment apartment = ApartmentSystem.GetApartment(id);
    //     List<Apartment> apartList = (List<Apartment>) player.getData("UserApartments");
    //     if (apartList.Contains(apartment))
    //     {
    //         player.rotation = apartment.Rotation;
    //         return apartment.Position;
    //     }
    // }
    //
    // player.rotation = apartments[0].Rotation;
    // return apartments[0].Position;

    return new mp.Vector3(259.8162, -1204.156, 29.28907);
}
