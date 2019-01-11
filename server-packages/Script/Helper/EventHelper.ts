export class EventHelper {
    public static resolveEventAsync(func: Function, ...args: any) {
        setTimeout(() => {
            try {
                func.apply(null, args);
            } catch (e) {
                console.error(e);
            }
        });
    }
}

