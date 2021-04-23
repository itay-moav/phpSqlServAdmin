import React from 'react';
//import {useSelector,useDispatch} from 'react-redux';
import {
  Switch,
  Route//,
  //Redirect,
  //useRouteMatch
} from "react-router-dom";

//import {UIActions} from "../../../store/ui";
import ShowServer from "./showServer";
import SelectServer from "./selectServer";
import DatabasePage from "../database/databasePage";

const ServerPage = () => {
    //let match = useRouteMatch();
    //const dispatch = useDispatch();
    //const currentServer  = useSelector(state => state.servers.currentServer);
    /*TOBEDELETED?
    if(!match.params.selectedServer && currentServer){ //ifthere is a selected server in the store, but not in the url TODO figure out if this allows 
                                                       //to switch servers
        return (<Redirect to={`/server/${currentServer}`} />);
    }*/

    return (
        <Switch>
            <Route path="/server/:selectedServer/database" component={DatabasePage} />
            <Route path="/server/:selectedServer" component={ShowServer} />
            <Route path="/server" component={SelectServer} />
        </Switch>
    );
}
 
export default ServerPage;

//<span>{match.params.selectedDb}</span>

/*
        <Switch>
            

            <Route path="/database/:selectedDb/table/:selectedTable" component={TablePage} />
            <Route path="/database/:selectedDb" component={ShowDatabase} />
            <Route path="/database" component={SelectDatabase} />
            <Redirect to="/database" />
        </Switch>
*/