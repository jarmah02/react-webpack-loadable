import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Loadable from "react-loadable";
import "./style.scss";

import Loading from "../Loading";
const Homepage = Loadable({
    loader: () => import("../Homepage"),
    loading: Loading,
});
const About = Loadable({
    loader: () => import("../About"),
    loading: Loading,
});

const App = ({ ...props }) => (
    <div className="App">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
            <Route path="/about" component={About} />
            <Route exact={true} component={Homepage} />
        </Switch>
    </div>
);

export default App;
