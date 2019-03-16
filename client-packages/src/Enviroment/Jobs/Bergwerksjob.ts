/**
 * Client Events:
 * - job_bergwerk_destroyAllMarkers,
 */

class BergwerksjobClient {
    private markerList: { position: Vector3Mp, blip: BlipMp, marker: MarkerMp }[] = [];

    constructor() {
        mp.events.add("job_bergwerk_createMarker", this.createMarker.bind(this));
        mp.events.add("job_bergwerk_destroyMarker", this.destroyMarker.bind(this));
        mp.events.add("job_bergwerk_destroyAllMarkers", this.destroyAllMarker.bind(this));
    }

    destroyAllMarker() {
        for (const index in this.markerList) {
            let {blip, marker} = this.markerList[index];

            blip.destroy();
            marker.destroy();
        }

        this.markerList = [];
    }

    destroyMarker() {
        const markerPosition = mp.players.local.position;
        for (const index in this.markerList) {
            let {position, blip, marker} = this.markerList[index];
            const positionM = new mp.Vector3(markerPosition.x, markerPosition.y, markerPosition.z);
            const positionS = new mp.Vector3(position.x, position.y, position.z);
            if (positionM.subtract(positionS).length() <= 5) {
                blip.destroy();
                marker.destroy();
                // @ts-ignore
                this.markerList.splice(index, 1);
                return;
            }
        }
    }

    createMarker(markerList: Vector3Mp[]) {
        for (let pos of markerList) {
            const positionE = new mp.Vector3(pos.x, pos.y, pos.z);
            positionE.add(new mp.Vector3(0,0, 1));

            const marker = mp.markers.new(31, positionE, 3, {
                bobUpAndDown: true,
                color: [100, 100, 255, 150]
            });

            const blip = mp.blips.new(1, pos, {
                color: 29
            });

            this.markerList.push({
                position: positionE,
                blip,
                marker
            });
        }
    }
}

new BergwerksjobClient();
