import {Logger, QueryRunner, getConnectionOptions} from "typeorm";
import {logger} from "./logger";
import {LOG_TYPES} from "./log_types";
import {LoggerOptions} from "typeorm/logger/LoggerOptions";

export class SqlLogger implements Logger {
    private logType: LoggerOptions | undefined;

    constructor() {
        getConnectionOptions().then((connectionOptions) => {
            this.logType = connectionOptions.logging;
        });
    }

    isLogTypeEnabled(level: "query" | "schema" | "error" | "warn" | "info" | "log" | "migration"): boolean {
        if (!this.logType) return false;
        if (this.logType === true || this.logType === "all") return true;
        if (this.logType.indexOf(level) !== -1) return true;
        return true;
    }

    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled(level)) {
            logger.log(level, message, {
                type: LOG_TYPES.SQL,
                sqlLogType: "log"
            });
        }
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled("migration")) {
            logger.log("info", message, {
                type: LOG_TYPES.SQL,
                sqlLogType: "migration"
            });
        }
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled("query")) {
            logger.log("info", "Query", {
                type: LOG_TYPES.SQL,
                parameters,
                query,
                sqlLogType: "query"
            });
        }
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled("error")) {
            logger.log("error", error, {
                type: LOG_TYPES.SQL,
                parameters,
                query,
                sqlLogType: "query"
            });
        }
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled("warn")) {
            logger.log("warn", "Query executed really slowly", {
                type: LOG_TYPES.SQL,
                time,
                parameters,
                query,
                sqlLogType: "query"
            });
        }
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        if (!this.isLogTypeEnabled("schema")) {
            logger.log("warn", message, {
                type: LOG_TYPES.SQL,
                sqlLogType: "schema"
            });
        }
    }
}
