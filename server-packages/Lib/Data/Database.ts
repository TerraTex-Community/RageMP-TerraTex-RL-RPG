import {Connection, createConnection, getConnection, getConnectionOptions} from "typeorm";
import {SqlLogger} from "../Services/logging/sql_logger";

export async function initDb(): Promise<void> {
    const connectionOptions = await getConnectionOptions();

    await createConnection(Object.assign(connectionOptions, {
        logger: new SqlLogger()
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


