import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import HomePage from "../pages/Home";
import AdminPage from "../pages/Admin/Payment/waiting"
import AboutPage from "../pages/About";
import CheckoutPage from "../pages/Checkout";
import PayPage from "../pages/Pay";
import ConfirmPage from "../pages/Confirm";
import CompletePage from "../pages/Complete";
import CreateEvents from "../pages/CreateEvents"
export const history = createHistory();

const Routers = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/pay" component={PayPage} />
        <Route exact path="/confirm" component={ConfirmPage} />
        <Route exact path="/complete" component={CompletePage} />
        <Route exact path="/createevents" component={CreateEvents} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({ Authentication });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
