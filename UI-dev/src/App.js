import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {appInit} from "./store/api";

//Pages
import ErrorBoundary from "./components/commons/errorBoundry";
import Layout from './components/layout/layout';

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
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
 );
}
export default App;
