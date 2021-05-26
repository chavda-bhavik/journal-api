import { ConnectionOptions, getConnectionOptions, createConnection, Connection } from "typeorm";

export const testConn = async (drop:boolean = false):Promise<Connection> => {
    const options:ConnectionOptions = await getConnectionOptions("test");
    return await createConnection({ 
        ...options, 
        synchronize: drop,
        dropSchema: drop,
        name: "default"
    });
}