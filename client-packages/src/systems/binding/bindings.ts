import {executeSpecialFunction, isSpecialFunction} from "./binding_special_func";
import {isChatInputActive} from "../../chat";

export const releaseFunctions = [
    "/voice_push_to_talk",
    "/show_playerlist"
];

export const controlInputs: any = {
    LEFT_AXIS_X: 218,
    LEFT_AXIS_Y: 219,
    RIGHT_AXIS_X: 220,
    RIGHT_AXIS_Y: 221,
    RUP: 222,
    RDOWN: 223,
    RLEFT: 224,
    RRIGHT: 225,
    LB: 226,
    RB: 227,
    LT: 228,
    RT: 229,
    LS: 230,
    RS: 231,
    PAD_UP: 232,
    PAD_DOWN: 233,
    PAD_LEFT: 234,
    PAD_RIGHT: 235,
    SELECT: 236
};

export interface Binding {
    func: string;
    isControl: boolean;
    key: number;
    release?: boolean;
}

export class Bindings {
    private bindings: Binding[] = [];
    private isBindingActivated = true;
    private readonly keysPressed: any = {};
    private executeBinds: any = {};

    constructor() {
        if (!mp.storage.data.bindings) {
            this.resetToDefaultBindings();
        } else {
            this.bindings = mp.storage.data.bindings;
        }
        this.prepareExecuteBinds();

        mp.events.add(RageEnums.EventKey.RENDER, this.renderFunc.bind(this));
    }

    prepareExecuteBinds(): void {
        this.executeBinds = {"controls": {}};
        for (const binding of this.bindings) {
            if (releaseFunctions.indexOf(binding.func) !== -1) {
                binding["release"] = true;
            } else {
                binding["release"] = false;
            }

            if (binding.isControl) {
                this.executeBinds.controls[binding.key] = binding;
            } else {
                this.executeBinds[binding.key] = binding;
            }
        }
    }

    resetToDefaultBindings(): void {
        this.bindings = [
            {"func": "/voice_push_to_talk", "isControl": false, "key": 75},
            {"func": "/show_cursor", "isControl": false, "key": 88},
            {"func": "/toggle_vehicle_engine", "isControl": false, "key": 77},
            {"func": "/show_playerlist", "isControl": false, "key": 89}
        ];
        mp.storage.data.bindings = this.bindings;
    }

    setBindings(bindings: Binding[]): void {
        this.bindings = bindings;
        mp.storage.data.bindings = this.bindings;
        mp.storage.flush();
        this.prepareExecuteBinds();
    }

    getBindings(): Binding[] {
        return this.bindings;
    }

    toggleBindings(bool: boolean): void {
        this.isBindingActivated = bool;
    }

    keyPressed(isControl: boolean, key: number): void {
        if (!isControl && key >= 112 && key <= 123) {
            return;
        }

        if (isChatInputActive) return;

        mp.events.call("script_key_pressed", isControl, key);

        if (this.isBindingActivated) {
            let execBinding: Binding;
            if (isControl) {
                execBinding = this.executeBinds.controls[key];
            } else {
                execBinding = this.executeBinds[key];
            }

            if (execBinding) {
                if (isSpecialFunction(execBinding.func)) {
                    executeSpecialFunction(execBinding.func, false);
                } else {
                    mp.events.call("simulateChat", execBinding.func);
                }
            }
        }
    }

    keyReleased(isControl: boolean, key: number): void {
        if (this.isBindingActivated) {
            let execBinding: Binding;
            if (isControl) {
                execBinding = this.executeBinds.controls[key];
            } else {
                execBinding = this.executeBinds[key];
            }

            if (
                execBinding
                && execBinding.release
                && execBinding.func.startsWith("/")
                && isSpecialFunction(execBinding.func)
            ) {
                executeSpecialFunction(execBinding.func, true);
            }
        }
    }

    renderFunc(): void {
        for (const tInputs in controlInputs) {
            if (controlInputs.hasOwnProperty(tInputs)) {
                const input = controlInputs[tInputs];
                if (mp.game.controls.isControlJustPressed(17, input)) {
                    this.keyPressed(true, input);
                } else if (mp.game.controls.isControlJustReleased(17, input)) {
                    this.keyReleased(true, input);
                }
            }
        }

        for (let i = 3; i < 244; i++) {
            if (mp.keys.isDown(i) && !this.keysPressed[i]) {
                this.keysPressed[i] = true;
                this.keyPressed(false, i);
            }
            if (mp.keys.isUp(i) && this.keysPressed[i]) {
                this.keyReleased(false, i);
                this.keysPressed[i] = false;
            }
        }
    }

    static getNameFromControlValue(key: number): string {
        for (const i in controlInputs) {
            if (controlInputs[i] === key) {
                return i;
            }
        }
        return "";
    }

    static getNameFromKeyValue(key: number): string {
        return keyboardMap[key];
    }
}

export const bindingsInstance = new Bindings();

export function getBindingManager(): Bindings {
    return bindingsInstance;
}


export const keyboardMap: any = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    96: "Num0",
    97: "Num1",
    98: "Num2",
    99: "Num3",
    100: "Num4",
    101: "Num5",
    102: "Num6",
    103: "Num7",
    104: "Num8",
    105: "Num9",
    107: "Num+",
    109: "Num-",
    110: "Num,",
    111: "Num/",
    144: "NumLock",
    186: "Ü",
    187: "+",
    188: ",",
    189: "-",
    190: ".",
    191: "#",
    192: "ö",
    219: "ß",
    220: "^",
    221: "´",
    222: "ä",
    226: "<"
};
