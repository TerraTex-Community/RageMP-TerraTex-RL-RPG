const path = require("path");

module.exports = {
    mode: "none",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts"]
    },
    output: {
        filename: "bundle.js"
    }
};
