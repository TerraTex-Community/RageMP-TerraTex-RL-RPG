import {IJob} from "./IJob";
import {Bergwerksjob} from "./Bergwerksjob/Bergwerksjob";

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
}
