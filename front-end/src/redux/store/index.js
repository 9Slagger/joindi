import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducers from "../reducers";
import _ from "lodash";

const loadState = () => {
  const serializedState = localStorage.getItem("store");
  if (serializedState === null) {
    return undefined;
  } else {
    return JSON.parse(serializedState);
  }
};

const saveState = state => {
  if (!_.isEmpty(state)) {
    localStorage.setItem("store", JSON.stringify(state));
  }
};

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducers(),
  loadState(),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
