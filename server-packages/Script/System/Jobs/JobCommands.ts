import {DbUser} from "../../../DB/entities/DbUser";
import {Chat} from "../Chat/Chat";
import {JobList} from "./Joblist";
import {IJob} from "./IJob";

mp.events.addCommand("getjob", (player => {
    if (player.vehicle) return;

    if ((<DbUser>player.customData.dbUser).data.job !== 0) {
        const job: IJob = JobList.getJobById((<DbUser>player.customData.dbUser).data.job);
        Chat.sendChatAlertToPlayer(
            player,
            "danger",
            `Du hast bereits den Job ${job.name}!`
        );
        return;
    }
    const job: IJob|false = JobList.getJobByPosition(player.position);

    if (job && job.checkPlayerRequirements(player)) {

        (<DbUser>player.customData.dbUser).data.job = job.id;
        Chat.sendChatNotificationToPlayer(
            player,
            `Du hast jetzt den Job ${job.name}!`
        );
        return;
    }
}));

mp.events.addCommand("quitjob", (player => {
    if (player.vehicle) return;

    if ((<DbUser>player.customData.dbUser).data.job === 0) {
        return;
    }
    const job: IJob|false = JobList.getJobById((<DbUser>player.customData.dbUser).data.job);
    if (job && job.jobStartingPoint.subtract(player.position).length() <= 2) {
        if (job.canPlayerQuitJob(player)) {
            (<DbUser>player.customData.dbUser).data.job = 0;
            Chat.sendChatNotificationToPlayer(
                player,
                `Du hast den Job ${job.name} erfolgreich gekündigt!`
            );
        }
    } else {
        Chat.sendChatAlertToPlayer(
            player,
            "danger",
            `Du kannst den Job nur am Jobpunkt kündigen!`
        );
    }
}));

mp.events.addCommand("jobhelp", (player => {
    if ((<DbUser>player.customData.dbUser).data.job === 0) {
        return;
    }
    const job: IJob|false = JobList.getJobById((<DbUser>player.customData.dbUser).data.job);

    job.sendJobHelp(player);
}));

mp.events.addCommand("startjob", (player => {
    if (player.vehicle) return;

    if ((<DbUser>player.customData.dbUser).data.job === 0) {
        return;
    }

    const job: IJob|false = JobList.getJobById((<DbUser>player.customData.dbUser).data.job);
    if (job && job.jobStartingPoint.subtract(player.position).length() <= 2) {
        if (job.checkPlayerRequirements(player)) {
            job.startJob(player);
        }
    } else {
        Chat.sendChatAlertToPlayer(
            player,
            "danger",
            `Du kannst den Job nur am Jobpunkt starten!`
        );
    }
}));
