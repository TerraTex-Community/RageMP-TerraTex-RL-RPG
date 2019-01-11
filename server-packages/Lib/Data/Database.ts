import {Connection, createConnection, getConnection} from 'typeorm';

export async function initDb() {
    await createConnection();
}

export async function getDatabase() {
    if (!getConnection()) {
        await initDb();
    }

    if (!getConnection().isConnected) {
        await getConnection().connect();
    }

    return getConnection();
}
