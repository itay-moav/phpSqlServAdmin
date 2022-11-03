import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
import Servers from "./routes/servers";
import ServersServerDatabases from "./routes/serversServerDatabases";
import ServersServerDatabasesDatabaseTables from './routes/serversServerDatabasesDatabaseTables';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    ()=>{
      if(location.pathname === "/"){
        navigate('servers');
      }
    },[]
  );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="servers/:server/databases/:database/tables/:table" element={<h2>a table</h2>} />
        <Route exact path="servers/:server/databases/:database/tables" element={<h2><ServersServerDatabasesDatabaseTables /></h2>} />
        <Route exact path="servers/:server/databases" element={<ServersServerDatabases />} />
        <Route exact path="servers" element={<Servers />} />  
      </Route>
      <Route path="*" element={<h2>WTF have you gone?!</h2>} />
    </Routes>
  );
}

export default App;
