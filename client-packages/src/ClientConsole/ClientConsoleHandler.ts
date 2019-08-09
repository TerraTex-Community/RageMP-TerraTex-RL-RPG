import {overwriteGlobalConsole} from "./registerConsoleGlobally";
import "./Logger";

export let clientConsoleBrowser: BrowserMp | null = null;
let isLoaded: boolean = false;
const preEntries: {msg: any, state: string}[] = [];

export function initClientConsole(): void{
    overwriteGlobalConsole();
    clientConsoleBrowser = mp.browsers.new("package://ui/index.html?page=pages/console.html");
    clientConsoleBrowser.active = false;
}

mp.keys.bind(0x7A, true, () => {
    if (!clientConsoleBrowser.active && !isLoaded) {
        // better with event?
        isLoaded = true;
        console.info("Console loaded.");

        for (const item of preEntries) {
            printToConsole(item.state, item.msg);
        }
    }

    openClientConsole(!clientConsoleBrowser.active);
});


export function openClientConsole(open: boolean = true): void {
    clientConsoleBrowser.active = open;
}

export function printToConsole(state: string, msg: any): void {
    if (!isLoaded) {
        preEntries.push({state, msg});
    }

    let message = "";
    if (typeof msg === "object") {
        const seen = [];
        message = `<pre>${
            JSON.stringify(msg,
                function (k: any, v: any): any {
                    if (typeof v === "object") {
                        if (!seen.indexOf(v)) {
                            return "__cycle__";
                        }
                        seen.push(v);
                    }
                    return v;
                }
                , 4)
        }</pre>`;
    } else {
        message = `${msg}`;
    }

    clientConsoleBrowser.execute(`printToConsole("${state}", "${message}")`);
}


