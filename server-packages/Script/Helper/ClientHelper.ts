import Player = RageMP.Player;
import {logger} from "../../Lib/Services/logging/logger";

export class ClientHelper {
    public static callClientSideFunc(player: Player, funcPathAfterMP: string, ...args: any): void {
        logger.debug(`Execute Client Func for ${player.name}: mp.${funcPathAfterMP}(${args})`);
        player.call("executeClientFunction", [funcPathAfterMP, JSON.stringify(args)]);
    }
}
