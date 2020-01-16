import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import HomePage from "../pages/Home";
import AdminPage from "../pages/Admin/Payment/waiting";
import ManageTag from "../pages/Admin/ManageTag/managetag";
import ApprovePayment from "../pages/Admin/ApprovePayment/approvepayment"
import CategoriesEvents from "../pages/CategoriesEvents"
import AboutPage from "../pages/About";
import CheckoutPage from "../pages/Checkout";
import PayPage from "../pages/Pay";
import ConfirmPage from "../pages/Confirm";
import CompletePage from "../pages/Complete";
import CreateEvents from "../pages/CreateEvents"
import PopularEvents from "../pages/PopularEvents"
import EventDetail from "../pages/EventDetail"
export const history = createHistory();

const Routers = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categoriesevents" component={CategoriesEvents}/>
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/managetag" component={ManageTag} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/pay" component={PayPage} />
        <Route exact path="/confirm" component={ConfirmPage} />
        <Route exact path="/complete" component={CompletePage} />
        <Route exact path="/createevents" component={CreateEvents} />
        <Route exact path="/approvepayment" component={ApprovePayment} />
        <Route exact path="/eventdetail" component={EventDetail} />
        <Route exact path="/popularevents" component={PopularEvents} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({
  Authentication
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routers);

