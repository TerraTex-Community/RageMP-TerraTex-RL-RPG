// create Job Marker
import {JobList} from "./Joblist";
import Player = RageMP.Player;
import Colshape = RageMP.Colshape;
import {IJob} from "./IJob";
import {DbUser} from "../../../DB/entities/DbUser";
import {Chat} from "../Chat/Chat";

for (const job of JobList.jobs) {
    mp.blips.new(385, job.jobStartingPoint, {color: 77, shortRange: true, name: "Job: " + job.name});
    mp.markers.new(29, job.jobStartingPoint, 1, {color: [100, 184, 230, 255]});
    mp.labels.new(job.name, job.jobStartingPoint.add(new mp.Vector3(0,0,0.5)), {
        color: [100, 184, 230, 255], los: true, drawDistance: 15, font: 2});
    const colShape = mp.colshapes.newSphere(job.jobStartingPoint.x, job.jobStartingPoint.y, job.jobStartingPoint.z, 2 );

    colShape.isJobShape = true;
    colShape.job = job;
}

mp.events.add(RageMP.Enums.Event.PLAYER_ENTER_COLSHAPE, (player: Player, shape: Colshape) => {
    if(!shape.isJobShape) {
        return;
    }

    const job: IJob = shape.job;
    const playerData = (<DbUser>player.customData.dbUser).data;

    if (playerData.job === job.id) {
        Chat.sendChatNotificationToPlayer(
            player,
            "Du kannst hier deinen Job fortsetzen. Nutze einfach /startjob oder nutze /jobhelp um eine Hilfe zu erhalten. ~n~Kündigen kannst du mit /quitjob"
        );
    } else {
        if (playerData.job !== 0) {
            Chat.sendChatNotificationToPlayer(
                player,
                "Du hast bereits einen anderen Job, um diesen zu beginnen zu können, kündige erst bei deinem alten Job!"
            );
        } else {
            Chat.sendChatNotificationToPlayer(
                player,
                `Willkommen beim Job ${job.name}. Du kannst den Job mit /getjob annehmen!`
            );
        }
    }

});


