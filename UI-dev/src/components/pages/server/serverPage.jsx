import React from 'react';

import {
  Switch,
  Route
} from "react-router-dom";

//import {UIActions} from "../../../store/ui";
import ShowServer from "./showServer";
import SelectServer from "./selectServer";
import DatabasePage from "../database/databasePage";

const ServerPage = () => {

    return (
        <Switch>
            <Route path="/server/:selectedServer/database" component={DatabasePage} />
            <Route path="/server/:selectedServer" component={ShowServer} />
            <Route path="/server" component={SelectServer} />
        </Switch>
    );
}
 
export default ServerPage;
