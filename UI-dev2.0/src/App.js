import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
import Servers from "./routes/servers";
import ServersServerDatabases from "./routes/serversServerDatabases";
import ServersServerDatabasesDatabaseTables from './routes/serversServerDatabasesDatabaseTables';
import ServersServerDatabasesDatabaseSql from './routes/serversServerDatabasesDatabaseSql';
import ServersServerDatabasesDatabaseSchemaTablesTable, { TableBrowse,TableCreateSql,TableFields,TableSql } from "./routes/serversServerDatabasesDatabaseSchemaTablesTable";

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
      <Route path="*" element={<Layout />}>
        <Route path="servers/:server/databases/:database/schema/:schema/tables/:table" element={<ServersServerDatabasesDatabaseSchemaTablesTable />}>
          <Route exact path="browse" element={<TableBrowse />} />
          <Route exact path="sql" element={<TableSql />} />
          <Route exact path="createsql" element={<TableCreateSql />} />
          <Route exact path="structure" element={<TableFields />} />
        </Route>

        <Route exact path="servers/:server/databases/:database/tables" element={<ServersServerDatabasesDatabaseTables />} />
        <Route exact path="servers/:server/databases/:database/sql" element={<ServersServerDatabasesDatabaseSql />} />
        <Route exact path="servers/:server/databases" element={<ServersServerDatabases />} />
        <Route exact path="servers" element={<Servers />} />  
      </Route>

      <Route index path="*" element={<h2>WhereTF have you gone?!</h2>} />

    </Routes>
  );
}

export default App;
