require("ts-node").register({
    preserveConstEnums: true,
    project: './packages/TerraTex/tsconfig.json'
});

require("./init.ts");
