import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';

//CONFIGURE SERVICES
import env from "./services/config";
import http from "./services/http";
import log from "./services/log";

log.setLogHandler(env.logHandler);
log.setLogLevel(env.logVerbosity);
http.setAppUrl(env.apiBaseUrl);
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
