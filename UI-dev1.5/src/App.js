import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
import Servers from "./routes/servers";
import ServersServerDatabases from "./routes/serversServerDatabases";
import ServersServerDatabasesDatabaseTables from './routes/serversServerDatabasesDatabaseTables';
import ServersServerDatabasesDatabaseTablesTable from "./routes/serversServerDatabasesDatabaseTablesTable";
import TableCreateSql from './routes/serversServerDatabasesDatabaseTablesTable/subroutes/createSql';
import TableFields    from './routes/serversServerDatabasesDatabaseTablesTable/subroutes/fields';
import TableSql from './routes/serversServerDatabasesDatabaseTablesTable/subroutes/sql';
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
        <Route exact path="servers/:server/databases/:database/tables/:table/sql" element={<TableSql />} />
        <Route exact path="servers/:server/databases/:database/tables/:table/createsql" element={<TableCreateSql />} />
        <Route exact path="servers/:server/databases/:database/tables/:table/fields" element={<TableFields />} />
        <Route exact path="servers/:server/databases/:database/tables/:table" element={<ServersServerDatabasesDatabaseTablesTable />} />
        <Route exact path="servers/:server/databases/:database/tables" element={<h2><ServersServerDatabasesDatabaseTables /></h2>} />
        <Route exact path="servers/:server/databases" element={<ServersServerDatabases />} />
        <Route exact path="servers" element={<Servers />} />  
      </Route>

      <Route path="*" element={<Layout />}>
        <Route index path="*" element={<h2>WhereTF have you gone?!</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
