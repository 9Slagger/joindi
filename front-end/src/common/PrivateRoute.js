import React from "./node_modules/react";
import { connect } from "./node_modules/react-redux";
import { Route, Redirect } from "./node_modules/react-router-dom";
import { getToken } from "../_helper/localStorage";

const PrivateRoute = ({ component: Component, location, ...rest }) => (
  <Route
    render={props =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )
    }
    {...rest}
  />
);

const mapStateToProps = ({ Authentication }) => ({ Authentication });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
