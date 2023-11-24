import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {fetchServers,loadDatabases,findConnectionNameByServer} from "./store/dbTreeSlice";

import "./index.css";
import App from './App';

//CONFIGURE SERVICES
import env  from "./services/config";
import http from "./services/http";
import log  from "./services/log";

log.setLogHandler(env.logHandler);
log.setLogLevel(env.logVerbosity);
http.setAppUrl(env.apiBaseUrl);

//Fetch config.php and await for it to finish before we continue. Lives depend on it
const ahhhMyServers = store.dispatch(fetchServers());
await ahhhMyServers.unwrap();

//TODO Implement some logic here to fix this shit
let currentState = store.getState();
const connName = findConnectionNameByServer('127.0.0.1');
const c = store.dispatch(loadDatabases({connectionName:connName(currentState),currentServer:'127.0.0.1'}));
await c.unwrap();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter basename="/vulcan">
        <App />
      </BrowserRouter>
    </Provider>
);
