import {Connection, createConnection, getConnection, getConnectionOptions} from "typeorm";
import {SqlLogger} from "../Services/logging/sql_logger";
import {wait} from "../../Script/Helper/Utilities";

export async function initDb(): Promise<void> {
    const connectionOptions = await getConnectionOptions();

    const connection = await createConnection(Object.assign(connectionOptions, {
        logger: new SqlLogger()
    }));

    await connection.runMigrations({
        transaction: "all"
    });
}

export function awaitDatabaseConnection(): Promise<any> {
    return new Promise((async resolve => {
        do {
            if (getConnection().isConnected) {
                resolve();
                break;
            }
            await wait(1000);
        } while(true);
    }));
}

export async function getDatabase(): Promise<Connection> {
    if (!getConnection()) {
        await initDb();
    }

    if (!getConnection().isConnected) {
        await getConnection().connect();
    }

    return getConnection();
}


