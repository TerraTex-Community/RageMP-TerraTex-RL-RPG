import {sendChatNotificationToPlayer} from '../Script/System/Chat/Chat';

const request = require("request-promise");
const fs = require("fs");

import Player = RageMP.Player;

class VersionCreator {
    versionIdentifier: string;
    currentVersion: string;

    constructor() {
        try {
            this.loadVersion();
        } catch (e) {
            console.error(e);
        }
    }

    async loadVersion() {
        await this.getVersionIdentifier();

        const body = JSON.parse(await request.get("https://bug.terratex.eu/api/rest/projects"));

        for (const project of body.projects) {
            if (project.id === 4) {
                const versions = project.versions;

                let nextDate = new Date(100);
                let version = "unknown";

                for (const versionId in versions) {
                    if (versions.hasOwnProperty(versionId) &&
                        versions[versionId].released &&
                        !versions[versionId].obsolete) {
                        if (new Date(versions[versionId].timestamp) > nextDate) {
                            version = versions[versionId].name;
                            nextDate = new Date(versions[versionId].timestamp);
                        }
                    }
                }

                this.currentVersion = version;
                break;
            }
        }

        this.printConsoleLog();
    }

    async getVersionIdentifier() {
        if (fs.existsSync("packages/TerraTex/version.json")) {
            const json = JSON.parse(fs.readFileSync("packages/TerraTex/version.json").toString());
            this.versionIdentifier = `${json.versionTimestamp}_${json.versionBuildId}_${json.gitBranch}_${json.gitCommit}`;
        } else {
            this.versionIdentifier = "local-unknown";
        }
    }

    printConsoleLog() {
        console.info(`Current Version: ${this.currentVersion}`);
        console.info(`Current VersionIdentifier: ${this.versionIdentifier}`);
    }

    printVersionToPlayer(player: Player) {
        const versionHtml = `Version: ${this.currentVersion}<br/>Identifier: ${this.versionIdentifier}`;
        sendChatNotificationToPlayer(player, versionHtml, "Aktuelle Version");
    }
}

const vObj = new VersionCreator();
export const version = vObj;

mp.events.addCommand("version", (player: Player) => {
    vObj.printVersionToPlayer(player);
});
