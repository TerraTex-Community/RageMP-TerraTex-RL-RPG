import {Logger, QueryRunner} from "typeorm";
import {logger} from "./logger";
import {LOG_TYPES} from "./log_types";

export class SqlLogger implements Logger {
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        logger.log(level, message, {
            type: LOG_TYPES.SQL,
            sqlLogType: "log"
        });
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        logger.log("info", message, {
            type: LOG_TYPES.SQL,
            sqlLogType: "migration"
        });
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.log("info", "Query", {
            type: LOG_TYPES.SQL,
            parameters,
            query,
            sqlLogType: "query"
        });
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.log("error", error, {
            type: LOG_TYPES.SQL,
            parameters,
            query,
            sqlLogType: "query"
        });
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        logger.log("warn", "Query executed really slowly", {
            type: LOG_TYPES.SQL,
            time,
            parameters,
            query,
            sqlLogType: "query"
        });
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        logger.log("warn", message, {
            type: LOG_TYPES.SQL,
            sqlLogType: "schema"
        });
    }

}
