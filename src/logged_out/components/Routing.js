import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Pricing from "./pricing/Pricing";

function Routing(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/pricing" component={Pricing} />
    </Switch>
  );
}

export default Routing;
