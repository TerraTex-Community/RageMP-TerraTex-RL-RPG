import {logger} from "../../Lib/Services/logging/logger";

export class EventHelper {
    public static resolveEventAsync(func: Function, ...args: any): void {
        setTimeout(() => {
            try {
                func.apply(null, args);
            } catch (e) {
                logger.error(e.message, {error: e});
            }
        });
    }
}
