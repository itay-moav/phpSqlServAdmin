import React, { useEffect } from 'react';
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {appInitServers} from "./store/api";

//Layout
import Layout from './components/layout/layout';

//Pages
import ServerPage from "./components/pages/server/serverPage";

/**
 * Log's user in, trigger upload of the content
 */
const App = (props) => {

  const dispatch = useDispatch();

  /**
   * Init's the app with list of available servers
   */
  useEffect( () => {
    dispatch(appInitServers());
	},[dispatch] );

  return (     
    
    <HashRouter>
      <Layout>
      <Switch>
        <Route path="/server/:selectedServer" component={ServerPage} />
        <Route path="/server" component={ServerPage} />
        <Redirect to="/server" />
      </Switch>
      </Layout>
    </HashRouter>
    
 );
}
export default App;
