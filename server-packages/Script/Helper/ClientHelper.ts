import Player = RageMP.Player;

export class ClientHelper {
    public static callClientSideFunc(player: Player, funcPathAfterMP: string, ...args: any): void {
        console.debug("Execute Client Func for " + player.name + ": mp." + funcPathAfterMP + "(" + args + ")");
        player.call("executeClientFunction", [funcPathAfterMP, JSON.stringify(args)]);
    }
}
