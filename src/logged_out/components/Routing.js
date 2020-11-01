import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Pricing from "./pricing/Pricing";
import About from "./about/About";

function Routing(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/pricing" component={Pricing} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
}

export default Routing;
