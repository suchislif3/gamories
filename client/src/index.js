import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from "./App";
import store from "./store/store";

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
