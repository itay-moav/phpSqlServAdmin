import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {fetchServers} from "./store/dbTreeSlice";

import "./index.css";
import App from './App';

//CONFIGURE SERVICES
import env  from "./services/config";
import http from "./services/http";
import log  from "./services/log";

log.setLogHandler(env.logHandler);
log.setLogLevel(env.logVerbosity);
http.setAppUrl(env.apiBaseUrl);

//Fetch config.php
store.dispatch(fetchServers());

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter basename="/vulcan">
        <App />
      </BrowserRouter>
    </Provider>
);
