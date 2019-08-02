import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Loadable from "react-loadable";

import App from "./components/App";
Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Router>
            <App />
        </Router>,
        document.getElementById("root"),
    );
});
