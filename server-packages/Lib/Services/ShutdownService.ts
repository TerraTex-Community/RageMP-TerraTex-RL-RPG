namespace ShutdownService {

    const shutdownFunctions: Function[] = [];
    const shutdownFunctionsNonParallel: Function[] = [];

    /**
     * Add an async function that is called before the server shutsdown (e.g. additional save functions)
     *
     * @param {Function} func - the ASYNC function that should be called
     * @param {boolean} [canBeRunInParallel=true] - if this is set to false the func will be run before all other functions and non-parallel
     */
    export function addToShutdownService(func: Function, canBeRunInParallel = true) {
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
    export async function startShutdownService(killServer = true) {
        for (const func of shutdownFunctionsNonParallel) {
            await func();
        }

        const allPromises: Promise<any>[] = [];
        for (const func of shutdownFunctions) {
            allPromises.push(func());
        }

        await Promise.all(allPromises);

        if (killServer) {
            process.exit(0);
        }
    }
}
