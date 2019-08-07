import {logger} from "./logging/logger";

export namespace ShutdownService {

    const shutdownFunctions: Function[] = [];
    const shutdownFunctionsNonParallel: Function[] = [];
    export let isServerShuttingDown: boolean = false;

    /**
     * Add an async function that is called before the server shutsdown (e.g. additional save functions)
     *
     * @param {Function} func - the ASYNC function that should be called
     * @param {boolean} [canBeRunInParallel=true] - if this is set to false the func will be run before all other functions and non-parallel
     */
    export function addToShutdownService(func: Function, canBeRunInParallel: boolean = true): void {
        if (canBeRunInParallel) {
            shutdownFunctions.push(func);
        } else {
            shutdownFunctionsNonParallel.push(func);
        }
    }

    /**
     * Starts the Shutdown Service - It calls all shutdown functions
     * @param {boolean} [killServer=true] - kills the server afterwards
     */
    export async function shutdownServer(killServer: boolean = true): Promise<void> {
        try {
            isServerShuttingDown = true;

            for (const func of shutdownFunctionsNonParallel) {
                logger.debug(`Execute Function before Shutdown: ${func.name}`);
                await func();
            }

            const allPromises: Promise<any>[] = [];
            for (const func of shutdownFunctions) {
                logger.debug(`Execute Function (in parallel) before Shutdown: ${func.name}`);
                allPromises.push(func());
            }

            await Promise.all(allPromises);

            if (killServer) {
                process.exit(0);
            }
        } catch (e) {
            logger.crit("Error occurred on Shutdown", {error: e});
        }
    }
}
