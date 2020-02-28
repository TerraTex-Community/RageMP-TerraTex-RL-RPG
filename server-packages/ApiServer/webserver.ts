import express from "express";

export async function startWebServer(): Promise<void> {
    const server = express();

    // @ts-ignore
    const port = mp.config.webport || 8080;

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));


    server.listen(port, () => {console.log("server started on port: " + port)});
}



// additional server configs
// mp.config.webport
// mp.config.webAuthUrl
