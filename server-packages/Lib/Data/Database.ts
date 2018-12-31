import {Connection, createConnection} from 'typeorm';

let connection: Connection;
export async function initDb() {
    await createConnection();
}

export async function getDatabase() {
    if (!connection) {
        await initDb();
    }

    return connection;
}
