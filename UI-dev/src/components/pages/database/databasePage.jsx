import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ShowDatabase from "./showDatabase";
import SelectDatabase from "./selectDatabase";
import TablePage from "../table/tablePage";

//After user selects a server to connect to, he needs to see list of databases and select one of those
//If a db is selected i.e. there is a db name in the uri, it renders the showDb page, if there is also a table in the uri, it will rout to the table pages.
//if no db in the uri, it will pull up the selection of db, if there is only one db (CURRENTLY ALWAYS TRUE!) it will select it and route there

const DatabasePage = () => {
    return (
        <Switch>
            <Route path="/server/:selectedServer/database/:selectedDb/table" component={TablePage} />
            <Route path="/server/:selectedServer/database/:selectedDb" component={ShowDatabase} />
            <Route path="/server/:selectedServer/database" component={SelectDatabase} />
            <Redirect to="/server" />
        </Switch>
    );
}
 
export default DatabasePage;
