import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Launches from "./Launches";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Launches} />
      </Switch>
    </Router>
  );
}

export default App;
