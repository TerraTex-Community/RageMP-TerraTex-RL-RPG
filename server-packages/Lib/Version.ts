import {Chat} from "../Script/System/Chat/Chat";

import * as fs from "fs";
import axios from "axios";

import Player = RageMP.Player;
import sendChatNotificationToPlayer = Chat.sendChatNotificationToPlayer;
import {logger} from "./Services/logging/logger";
import {registerServerCommand} from "./Services/ServerConsole";

class VersionCreator {
    versionIdentifier: string;
    currentVersion: string;

    constructor() {
        this.loadVersion().catch(e => logger.error(e.message, {error: e}));
    }

    async loadVersion(): Promise<void> {
        await this.getVersionIdentifier();
        const response = await axios.get("https://bug.terratex.eu/api/rest/projects");

        for (const project of response.data.projects) {
            if (project.id === 4) {
                const versions = project.versions;

                let nextDate = new Date(100);
                let versionS = "unknown";

                for (const versionId in versions) {
                    if (
                        versions.hasOwnProperty(versionId)
                        && versions[versionId].released
                        && !versions[versionId].obsolete
                        && new Date(versions[versionId].timestamp) > nextDate
                    ) {
                        versionS = versions[versionId].name;
                        nextDate = new Date(versions[versionId].timestamp);

                    }
                }

                this.currentVersion = versionS;
                break;

            }
        }

        this.printConsoleLog();
    }

    async getVersionIdentifier(): Promise<void> {
        if (fs.existsSync("packages/TerraTex/version.json")) {
            const json = JSON.parse(fs.readFileSync("packages/TerraTex/version.json").toString());
            this.versionIdentifier = `${json.versionTimestamp}_${json.versionBuildId}_${json.gitBranch}_${json.gitCommit}`;
        } else {
            this.versionIdentifier = "local-unknown";
        }
    }

    printConsoleLog(useLogger: boolean = true): void {
        const printer = useLogger ? logger : console;
        printer.info(`Current Version: ${this.currentVersion}`);
        printer.info(`Current VersionIdentifier: ${this.versionIdentifier}`);
    }

    printVersionToPlayer(player: Player): void {
        const versionHtml = `
            Version: ${this.currentVersion}<br/>
            Identifier: <span class="copyToClipOnClick-parent">
                ${this.versionIdentifier} <i class="far fa-clipboard pointer copyToClipOnClickWithAlert"></i></span>
        `;
        sendChatNotificationToPlayer(player, versionHtml, "Aktuelle Version");
    }
}

export let version;

export const initVersionInstance = () => {
    version = new VersionCreator();
};

registerServerCommand("version", () => {
    version.printConsoleLog(false);
});

mp.events.addCommand("version", (player: Player) => {
    version.printVersionToPlayer(player);
});
