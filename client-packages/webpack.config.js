const path = require("path");

module.exports = {
    mode: "none",
    devtool: "source-map",
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
