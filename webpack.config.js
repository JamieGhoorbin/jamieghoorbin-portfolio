const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web"; // default. Fixes issues with Webpack 5

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
};

module.exports = {
    mode: mode,
    
    // output images etc. into a folder for dist.
    output: {
        // what path to clean
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },
   

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                // bundles all images into folder "asset/resource"
                // asset inline's assets < 8kb into js, else in folder
                type: "asset",
                // used to customised asset size limit
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 30 * 1024,
                //     },
                // },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader", // order important - add vendor prefixes
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
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