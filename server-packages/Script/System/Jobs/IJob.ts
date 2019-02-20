import Player = RageMP.Player;
import Vector3 = RageMP.Vector3;

export interface IJob {
    // static instance: IJob;
    /**
     * constructor should store static instance = this;
     * and id of job
     *
     * @param id
     */
    // tslint:disable-next-line:typedef
    // new(id: number);

    id: number;
    name: string;
    jobStartingPoint: Vector3;

    startJob(player: Player): void;
    sendJobHelp(player: Player): void;
    checkPlayerRequirements(player: Player): boolean;
    canPlayerQuitJob(player: Player): boolean;
}
