import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
//FOR NOW - I KEEP THIS PART SILENT, UNTIL I HAVE MORE DATABASES TO WORK WITH

const DatabasePage = () => {
    const match = useRouteMatch();
    console.log('MMMMMMMMMMMM',match);
    return ( 
    
        <span>{match.params.selectedDb}</span>
    );
}
 
export default DatabasePage;