import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";

import {UIActions} from "../../../store/ui";
import ShowDatabase from "./showDatabase";
import SelectDatabase from "./selectDatabase";
import TablePage from "../table/tablePage";

//After user selects a server to connect to, he needs to see list of databases and select one of those
//If a db is selected i.e. there is a db name in the uri, it renders the showDb page, if there is also a table in the uri, it will rout to the table pages.
//if no db in the uri, it will pull up the selection of db, if there is only one db (CURRENTLY ALWAYS TRUE!) it will select it and route there

const DatabasePage = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const currentDb  = useSelector(state => (state.databases.current) );
    dispatch(UIActions.resetTableUI());

    if(!match.params.selectedDb && currentDb){
        return (<Redirect to={`/database/${currentDb}`} />);
    }

    return (
        <>
        <Switch>
            <Route path="/database/:selectedDb/table/:selectedTable" component={TablePage} />
            <Route path="/database/:selectedDb" component={ShowDatabase} />
            <Route path="/database" component={SelectDatabase} />
            <Redirect to="/database" />
        </Switch>
        </>
    );
}
 
export default DatabasePage;

//<span>{match.params.selectedDb}</span>