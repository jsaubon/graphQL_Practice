require("./bootstrap");

import { render } from "react-dom";
import React, { useContext, useReducer } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Context from "./context";
import reducer from "./reducer";

import LayoutContent from "./Layout/LayoutContent";
import "antd/dist/antd.css";
import "../assets/custom.css";
import LeadsPage from "./pages/LeadsPage";

const App = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/" name="home" component={LayoutContent} />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

export default App;

render(<App />, document.getElementById("app"));
