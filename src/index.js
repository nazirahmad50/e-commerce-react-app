import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

import store from "./redux/store";

ReactDOM.render(
  //only used in debug mode helps with debugging*
  <React.StrictMode>
    {/*allows the app to access to all the things related to the redux store so it has to be the parent of everything*/}
    {/* will give the store context to the rest of the app so we can dispatch actions to store and get values from store*/}
    <Provider store={store}>
      {/*gives the App comp all the functionality for routing*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
