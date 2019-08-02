import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { ReactLoadablePlugin } from "react-loadable/webpack";
import ExtractTextPlugin from "mini-css-extract-plugin";

const { NODE_ENV } = process.env;

export default {
    mode:
        !NODE_ENV || NODE_ENV === "development" ? "development" : "production",
    entry: "./src/public/index.jsx",
    output: {
        path: path.resolve("build"),
        filename: "bundle.js",
        publicPath: "/static/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: ExtractTextPlugin.loader },
                    "css-loader",

                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve("src", "public", "index.html"),
            inject: false,
        }),
        new ReactLoadablePlugin({
            filename: "./build/react-loadable.json",
        }),
        new ExtractTextPlugin({
            filename: "main.css",
            chunkFilename: "[id].css",
        }),
    ],
};
