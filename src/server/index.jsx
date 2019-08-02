import "ignore-styles";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import App from "../public/components/App";
dotenv.config();

const app = express();
const stats = JSON.parse(
    fs
        .readFileSync(
            path.resolve(__dirname, "../../build", "react-loadable.json"),
        )
        .toString(),
);

const { SERVER_PORT } = process.env;

app.use("/static", express.static(path.resolve(__dirname, "../../build")));

app.get("*", (req, res, next) => {
    let modules = [];
    let html = fs
        .readFileSync(path.resolve(__dirname, "../public/index.html"))
        .toString();

    const content = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Router location={req.url}>
                <App />
            </Router>
        </Loadable.Capture>,
    );

    const bundles = getBundles(stats, modules);
    const jsFiles = bundles.filter(bundle => /\.js$/.test(bundle.publicPath));
    const cssFiles = bundles.filter(bundle => /\.css$/.test(bundle.publicPath));

    html = html
        .replace(
            "{ jsTags }",
            `${jsFiles.map(
                bundle => `<script src="${bundle.publicPath}"></script>`,
            )}`,
        )
        .replace(
            "{ StyleTags }",
            `${cssFiles.map(
                bundle =>
                    `<link rel="stylesheet" href="${bundle.publicPath}"/>`,
            )}`,
        )
        .replace('<div id="root"></div>', `<div id="root">${content}</div>`);

    res.send(html);
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening on ${SERVER_PORT}`);
});
