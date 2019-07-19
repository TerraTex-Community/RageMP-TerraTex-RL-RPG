import {Client} from "@elastic/elasticsearch";
import {scheduleJob} from "node-schedule";
import {isDevServer} from "../../Script/Admin/AdminHelper";
import {logger} from "./logging/logger";

export const elasticClient = new Client({
    node: `http://localhost:9200`
});

scheduleJob(`*/15 * * * *`, async () => {
   // send current perf data

    try {
        await elasticClient.index({
            body: {
                timestamp: new Date().toISOString(),
                currentPlayers: mp.players.length,
                server: isDevServer() ? "dev" : "master"
            },
            index: "perf"
        });
    } catch (error) {
        logger.error("Could not store perf data", {error});
    } finally {
        logger.info("run perf runner");
    }
});
