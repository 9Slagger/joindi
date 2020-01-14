import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import HomePage from "../pages/Home";
import CreateEvents from "../pages/CreateEvents"
export const history = createHistory();

const Routers = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/createevents" component={CreateEvents} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({ Authentication });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
