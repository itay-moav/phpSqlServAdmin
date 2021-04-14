import React, { useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {appInit} from "./store/api";

//Layout
import ErrorBoundary from "./components/commons/errorBoundry";

//Pages
import DatabasePage from "./components/pages/database/databasePage";
import TablePage from "./components/pages/table/tablePage";

/**
 * Log's user in, trigger upload of the content
 */
const App = (props) => {

  const dispatch = useDispatch();

  /**
   * Init's the app with user and content info
   */
  useEffect( () => {
    dispatch(appInit());
	},[dispatch] );

  return (     
    
    <BrowserRouter>
      <Switch>
        <Route path="/database/:selectedDb" component={TablePage} />
        <Redirect to="/database/current" />
      </Switch>
    </BrowserRouter>
    
 );
}
export default App;
