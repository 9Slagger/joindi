import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
export const history = createHistory();

const Routers = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({ Authentication });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
