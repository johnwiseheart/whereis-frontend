import "babel-polyfill";
import WhereIs from "components/WhereIs";
import "es6-promise/auto";
import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { whereisApp } from "./reducers";
import rootSaga from "./sagas";

declare var module: { hot: any };

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  whereisApp,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

export const action = (type, payload = undefined) => store.dispatch({type, payload});

const rootEl = document.getElementById("app");

render(
  <AppContainer>
    <Provider store={store}>
      <WhereIs />
    </Provider>
  </AppContainer>,
  rootEl,
);

// Handle hot reloading actions from Webpack
if (module.hot) {
  module.hot.accept("./components/WhereIs", () => {
    const NextApp = require("./components/WhereIs").default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl,
    );
  });
}
