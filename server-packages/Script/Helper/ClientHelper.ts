export class ClientHelper {
    public static callClientSideFunc(player: PlayerMp, funcPathAfterMP: string, ...args: any) {
        console.debug("Execute Client Func for " + player.name + ": mp." + funcPathAfterMP + "(" + args + ")");
        player.call("executeClientFunction", [funcPathAfterMP, JSON.stringify(args)]);
    }
}

