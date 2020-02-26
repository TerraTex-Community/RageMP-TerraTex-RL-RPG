import express from "express";
import { Provider } from 'oidc-provider';

export async function startWebServer(): Promise<void> {
    const server = express();

    // const providerConfig = {
    //     clients: [{
    //         client_id: 'test-client',
    //         client_secret: 'test-secret',
    //         redirect_uris: ['http://localhost/cb'],
    //         // + other client properties
    //     }]
    // };
    const port = mp.config.webport || 8080;

    // const oidc: Provider = new Provider(`${mp.config.webAuthUrl}/auth` || `http://localhost:${port}/auth`, providerConfig);

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));



    // server.use("/auth", oidc.callback);
    server.listen(port, () => {console.log("server started")});
}



// additional server configs
// mp.config.webport
// mp.config.webAuthUrl
