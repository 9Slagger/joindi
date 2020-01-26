import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import HomePage from "../pages/Home";
import AdminPage from "../pages/Admin/Payment/waiting";
import ManageTag from "../pages/Admin/ManageTag";
import ApprovePayment from "../pages/Admin/ApprovePayment/approvepayment";
import TagEvents from "../pages/TagEvents";
import AboutPage from "../pages/About";
import CheckoutPage from "../pages/Checkout";
import PayPage from "../pages/Pay";
import ConfirmPage from "../pages/Confirm";
import CompletePage from "../pages/Complete";
import CreateEvents from "../pages/CreateEvents";
import CategoriesEvents from "../pages/CategoriesEvents";
import EventDetail from "../pages/EventDetail";
import ApproveEvent from "../pages/Admin/ApproveEvent"
import UpdateEvent from "../pages/Admin/UpdateEvent"
import Search from "../pages/Search"
import ManageUser from "../pages/Admin/ManageUser/index"
import UserProfile from "../pages/User/UserProfile";
import SearchTag from "../pages/SearchTag";
import JoinEvent from "../pages/User/JoinEvent";
import MyEvent from "../pages/User/MyEvent";
import MyOrders from "../pages/User/MyOrder";
import Bookmark from "../pages/User/Bookmark";
export const history = createHistory();

const Routers = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tagevents" component={TagEvents} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/managetag" component={ManageTag} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/pay" component={PayPage} />
        <Route exact path="/confirm" component={ConfirmPage} />
        <Route exact path="/complete" component={CompletePage} />
        <Route exact path="/createevents" component={CreateEvents} />
        <Route exact path="/approveevent" component={ApproveEvent} />
        <Route exact path="/approvepayment" component={ApprovePayment} />
<<<<<<< HEAD
        <Route exact path="/updateevent/:eventId" component={UpdateEvent}/>
=======

        <Route exact path="/eventdetail" component={EventDetail} />

>>>>>>> develop
        <Route exact path="/eventdetail/:eventId" component={EventDetail} />

        <Route
          exact
          path="/categoriesevents/:categorieId"
          component={CategoriesEvents}
        />
        <Route exact path="/categoriesevents/:categorieId" component={CategoriesEvents} />
        <Route exact path="/searchevnts" component={Search} />
        <Route exact path="/manageuser" component={ManageUser} />
        <Route exact path="/userprofile" component={UserProfile} />
        <Route exact path="/searchtag/:tagId" component={SearchTag} />
        <Route exact path="/joinevent" component={JoinEvent} />
        <Route exact path="/myevent" component={MyEvent} />
        <Route exact path="/myorder" component={MyOrders} />
        <Route exact path="/bookmark" component={Bookmark} />

      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({
  Authentication
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
