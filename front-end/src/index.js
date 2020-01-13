import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers";
import "antd/dist/antd.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById("root")
);