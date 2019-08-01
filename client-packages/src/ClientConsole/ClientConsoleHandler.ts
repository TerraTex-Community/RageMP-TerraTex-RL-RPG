import {overwriteGlobalConsole} from "./registerConsoleGlobally";

export let clientConsoleBrowser: BrowserMp | null = null;

export function initClientConsole(): void{
    overwriteGlobalConsole();

    clientConsoleBrowser = mp.browsers.new("package://ui/index.html?page=pages/login/Login.html");
    clientConsoleBrowser.active = false;
}

// F3 => Binding Menü
mp.keys.bind(0x7B, true, () => {
    openClientConsole(!clientConsoleBrowser.active);
});

export function openClientConsole(open = true) {
    clientConsoleBrowser.active = open;
}

export function printToConsole(state: string, msg: any): void {
    let message = "";
    if (typeof msg === "object") {
        let seen = [];
        message = `<pre>${
            JSON.stringify(msg,
                function (k, v) {
                    if (typeof v == "object") {
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


