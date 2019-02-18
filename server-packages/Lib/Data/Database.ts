import {Connection, createConnection, getConnection} from "typeorm";

export async function initDb(): Promise<void> {
    await createConnection();
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
