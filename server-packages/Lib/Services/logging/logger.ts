import {createLogger, format, transports} from "winston";
import {LOG_TYPES} from "./log_types";
import moment from "moment";

const timezoned = (): string => {
    return moment().toISOString(true);
};

export const logger = createLogger({
    level: "debug",
    defaultMeta: {
        type: LOG_TYPES.SYSTEM
    },
// @ts-ignore
    format: format.timestamp({alias: "@timestamp", format: timezoned}),
    transports: [
        new transports.File({
            format: format.json({replacer: replaceErrors}),
            filename: "server.log",
            dirname: "logs",
            maxsize: 104857600
        }),
        new transports.Console({
// @ts-ignore
            format: format.combine(format.timestamp({format: timezoned}), format.colorize(), myConsoleFormat())
        })
    ]
});

function replaceErrors(fKey: any, value: any): any {
    if (value instanceof Buffer) {
        return value.toString('base64');
    } else if (value instanceof Error) {
        const error: any = {};

        Object.getOwnPropertyNames(value).forEach(function (key: any): void {
            error[key] = (value as any)[key];
        });

        return error;
    }

    return value;
}

const ignoreKeys: any[] = ["message", "level", "timestamp", "@timestamp", "type"];
function myConsoleFormat(): any {
    return format.printf((info) => {
        const data = {};
        for (const key in info) {
            if (info.hasOwnProperty(key) && ignoreKeys.indexOf(key) === -1) {
                data[key] = info[key];
            }
        }


        return `[${info.timestamp}][${info.level}][${info.type}] ${info.message} - ${JSON.stringify(data, null, 2)}`;
    });
}

function myFormat(): any {
    return format.printf((info) => {
        const data = Object.getOwnPropertySymbols(info).find((value) => value.toString() === "Symbol(message)");
        // @ts-ignore
        const additional = info[data] ? info[data] : "";
        return `[${info.timestamp}][${info.level}][${info.type}] ${info.message} - ${additional}`;
    });
}
