const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web"; // default. Fixes issues with Webpack 5
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
     // Temporary workaround for 'browserslist' bug that is being patched in the near future
    target = "browserslist";
}; 

if(process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
};


module.exports = {
    // mode defaults to 'production' if not set.
    mode: mode,

    // This is unnecessary in Webpack 5, because it's the default.
    // However, react-refresh-webpack-plugin can't find the entry without it.
    entry: "./src/index.js",
    
    // output images etc. into a folder for dist.
    output: {
        // output path is required for `clean-webpack-plugin`
        path: path.resolve(__dirname, "dist"),
        // this places all images processed in an image folder
        assetModuleFilename: "images/[hash][ext][query]",
    },
   

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                // bundles all images into folder "asset/resource"
                // asset inline's assets < 8kb into js, else in folder
                
                /**
                 * The `type` setting replaces the need for "url-loader"
                 * and "file-loader" in Webpack 5.
                 *
                 * setting `type` to "asset" will automatically pick between
                 * outputing images to a file, or inlining them in the bundle as base64
                 * with a default max inline size of 8kb
                 */
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
                    // according to the docs, sass-loader should be at the bottom, which
                    // loads it first to avoid prefixes in your sourcemaps and other issues.
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    // without additional settings, this will reference .babelrc
                    loader: "babel-loader",
                }
            },
        ],
    },

    plugins: plugins,

    target: target,


    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map", // easier to read in debugger after combining and minified 
    
    // required if using webpack-dev-server
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 9000,
    },
};