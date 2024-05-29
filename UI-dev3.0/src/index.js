import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {fetchServers,loadDatabases,findConnectionNameByServer,findConnectionNameByServerAndDb,loadDatabaseTables} from "./store/dbTreeSlice";

import "./index.css";
import App from './App';

//CONFIGURE SERVICES
import env  from "./services/config";
import http from "./services/http";
import log  from "./services/log";

log.setLogHandler(env.logHandler);
log.setLogLevel(env.logVerbosity);
http.setAppUrl(env.apiBaseUrl);


//----------------------------------- PRE LOADING START A--------------------------------------------------------------
//Fetch config.php and await for it to finish before we continue. Lives depend on it
const ahhhMyServers = store.dispatch(fetchServers());
await ahhhMyServers.unwrap();

//THIS IS THE User Refreshed page or User deep linked scenario handler
//It preloads all the data the system expects to have when going deep links
//Added v3.0.0

//Check if we are deep linked. This means the url will be deeper than */server/?????/database/
const deepLink = isDeepLink();
if(deepLink){
  console.log("We are doing deeplinks data preloading",deepLink);
  await handleDeepLinksDataLoad(store,deepLink);
}

//----------------------------------- PRE LOADING FIN A--------------------------------------------------------------





//NORMAL REACT FLOW HERE
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter basename="/vulcan">
        <App />
      </BrowserRouter>
    </Provider>
);




//----------------------------------- PRE LOADING START B--------------------------------------------------------------

/**
 * Check the url and if we have any parts after the /database/
 * part, and return that or false
 */
function isDeepLink(){
  const path = window.location.pathname;
  if(path.includes("/database/")){
    //see which level of data we need to load
    let pathParts = path.split("/database/")[1];
    if(pathParts.length === 0){//nothing after the /
      return false;
    }

    pathParts = pathParts.split("/");
    console.log("Deep path to analyze is",pathParts);
    return {
      server:   path.split("/server/")[1].split("/")[0],
      database: pathParts[0],
      schema:   pathParts[2] || null,
      table:    pathParts[4] || null
    };

  } else {
    return false;
  }
}

/**
 * part 0 is the db name
 * 
 * @param {Object} store 
 * @param {Array} deepLinkParts 
 */
async function handleDeepLinksDataLoad(store,deepLinkParts){
  let currentState = store.getState();
  console.log('aaaa');
  const connName = findConnectionNameByServer(deepLinkParts.server)(currentState);
  console.log('bbb',connName);
  const c = store.dispatch(loadDatabases({connectionName:connName,currentServer:deepLinkParts.server}));
  await c.unwrap();

  //Table deep, TODO when more items added to URL, add those here and the function above
  if(deepLinkParts.table){
    currentState = store.getState();
    const dblvlConnName = findConnectionNameByServerAndDb(deepLinkParts.server,deepLinkParts.database)(currentState);
    console.log("Loading table info with connection name",dblvlConnName);
    const d = store.dispatch(loadDatabaseTables({
      connectionName:dblvlConnName,
      server:deepLinkParts.server,
      database:deepLinkParts.database})
    );
    await d.unwrap();
  }
}

//----------------------------------- PRE LOADING FIN B--------------------------------------------------------------