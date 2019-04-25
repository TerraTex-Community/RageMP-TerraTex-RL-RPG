import {IJob} from "./IJob";
import {Bergwerksjob} from "./Bergwerksjob/Bergwerksjob";
import Vector3 = RageMP.Vector3;

export class JobList {
    static jobs: IJob[] = [
        new Bergwerksjob(1)
    ];

    /**
     * @param id
     * @throws Error
     */
    static getJobById(id: number): IJob {
        for (const job of JobList.jobs) {
            if (job.id === id) {
                return job;
            }
        }

        throw new Error(`There is no Job with ID ${id}`);
    }

    /**
     *
     * @param position
     * @return returns the job or false if there is no job at this position
     */
    static getJobByPosition(position: Vector3): IJob|false {
        for (const job of JobList.jobs) {
            if (job.jobStartingPoint.subtract(position).length() <= 2) {
                return job;
            }
        }
        return false;
    }
}
