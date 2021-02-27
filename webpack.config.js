const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
let target = "web"; // default. Fixes issues with Webpack 5

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
};

module.exports = {
    mode: mode,

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader", // order important - add vendor prefixes
                    "sass-loader"],
            },
        ],
    },

    plugins: [ 
        new MiniCssExtractPlugin()
    ],

    target: target,


    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map", // easier to read in debugger after combining and minified 
    devServer: {
        contentBase: "./dist",
        port: 9000,
        hot: true,
    },
};