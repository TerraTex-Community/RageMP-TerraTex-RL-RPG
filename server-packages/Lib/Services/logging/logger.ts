import {createLogger, format, transports} from "winston";
import {LOG_TYPES} from "./log_types";


export const logger = createLogger({
    level: "debug",
    defaultMeta: {
        type: LOG_TYPES.SYSTEM
    },
    format: format.combine(format.timestamp({alias: "@timestamp"}), format.json({replacer: replaceErrors})),
    transports: [
        new transports.File({
            filename: "server.log",
            dirname: "../logs",
            maxsize: 104857600
        }),
        new transports.Console({
            format: format.combine(format.timestamp(), myFormat())
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

function myFormat(): any {
    return format.printf((info) => {
        const data = Object.getOwnPropertySymbols(info).find((value) => value.description === "message");
        // @ts-ignore
        const additional = info[data] ? info[data] : "";
        return `[${info.timestamp}][${info.level}][${info.type}] ${info.message} - ${additional}`;
    });
}
