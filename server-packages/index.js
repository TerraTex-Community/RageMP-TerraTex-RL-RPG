console.log(process.version);

require("ts-node").register({
    project: './packages/TerraTex/tsconfig.json'
});

require("./init.ts");
