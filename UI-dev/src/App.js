import React, { useEffect } from 'react';
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {appInit} from "./store/api";

//Layout
import Layout from './components/layout/layout';
import ErrorBoundary from "./components/commons/errorBoundry";

//Pages
import DatabasePage from "./components/pages/database/databasePage";

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
    
    <HashRouter>
      <Layout>
      <Switch>
        <Route path="/database/:selectedDb" component={DatabasePage} />
        <Route path="/database" component={DatabasePage} />
        <Redirect to="/database" />
      </Switch>
      </Layout>
    </HashRouter>
    
 );
}
export default App;
