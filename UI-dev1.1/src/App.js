import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
import Servers from "./routes/servers";
import ServersServerDatabases from "./routes/serversServerDatabases";

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
        <Route path="servers" element={<Servers />} />
        <Route path="servers/:server/databases" element={<ServersServerDatabases />} />
        <Route path="servers/:server/databases/:database/tables" element={<h2>list of tables</h2>} />
        <Route path="servers/:server/databases/:database/tables/:table" element={<h2>a table</h2>} />
      </Route>
      <Route path="*" element={<h2>WTF have you gone?!</h2>} />
    </Routes>
  );
}

export default App;
