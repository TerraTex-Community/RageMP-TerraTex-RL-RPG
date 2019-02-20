import {IJob} from "../IJob";

export class Bergwerksjob implements IJob {
    id: number;
    jobStartingPoint: RageMP.Vector3 = new mp.Vector3(0,0,0);
    name: string = "Bergwerksjob";
    static instance: Bergwerksjob;

    constructor(id: number) {
        Bergwerksjob.instance = this;
        this.id = id;
    }

    canPlayerQuitJob(player: RageMP.Player): boolean {
        return false;
    }

    checkPlayerRequirements(player: RageMP.Player): boolean {
        return false;
    }

    sendJobHelp(player: RageMP.Player): void {
    }

    startJob(player: RageMP.Player): void {
    }
}
