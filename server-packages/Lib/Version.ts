import {Chat} from "../Script/System/Chat/Chat";

import * as request from "request-promise";
import * as fs from "fs";

import Player = RageMP.Player;
import sendChatNotificationToPlayer = Chat.sendChatNotificationToPlayer;

class VersionCreator {
    versionIdentifier: string;
    currentVersion: string;

    constructor() {
        this.loadVersion().catch(e => console.error(e));
    }

    async loadVersion(): Promise<void> {
        await this.getVersionIdentifier();

        const body = JSON.parse(await request.get("https://bug.terratex.eu/api/rest/projects"));

        for (const project of body.projects) {
            if (project.id === 4) {
                const versions = project.versions;

                let nextDate = new Date(100);
                let versionS = "unknown";

                for (const versionId in versions) {
                    if (versions.hasOwnProperty(versionId) &&
                        versions[versionId].released &&
                        !versions[versionId].obsolete) {
                        if (new Date(versions[versionId].timestamp) > nextDate) {
                            versionS = versions[versionId].name;
                            nextDate = new Date(versions[versionId].timestamp);
                        }
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

    printConsoleLog(): void {
        console.info(`Current Version: ${this.currentVersion}`);
        console.info(`Current VersionIdentifier: ${this.versionIdentifier}`);
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

const vObj = new VersionCreator();
export const version = vObj;

mp.events.addCommand("version", (player: Player) => {
    vObj.printVersionToPlayer(player);
});
