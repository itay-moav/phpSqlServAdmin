import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
//server 
import ServerIndex from "./routes/server/serverIndex";

//database
import Databaseindex from './routes/server/database/databaseIndex';
import DatabaseObjects from './routes/server/database/databaseObjects';

//schema
import SchemaIndex from './routes/server/database/schema/schemaIndex';

//Table
import TableIndex from './routes/server/database/schema/table/tableIndex';


import {DatabasesSql,DatabasesTables} from "./routes/serversServerDatabases";
import ServersServerDatabasesDatabaseSchemaTablesTable,{  
          TableBrowse,
          TableSearch,
          TableInsert,
          TableCreateSql,
          TableStructure,
          TableSql,
          TableOperations } from "./routes/serversServerDatabasesDatabaseSchemaTablesTable";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    ()=>{
      if(location.pathname === "/"){
        navigate('server');
      }
     // eslint-disable-next-line
    },[]
  );
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="server">
          <Route index element={<ServerIndex />} />
          <Route path=":server/database">
            <Route index element={<Databaseindex />} />
            <Route path=":database">
              <Route path="objects" element={<DatabaseObjects />} />




          <Route exact path="sql" element={<DatabasesSql />} />

          <Route exact path="schema/:schema">            
            <Route exact path="tables" element={<DatabasesTables />} />
            <Route exact path="sql" element={<DatabasesSql />} />

            <Route path="tables/:table" element={<ServersServerDatabasesDatabaseSchemaTablesTable />}>
              <Route exact path="browse" element={<TableBrowse />} />
              <Route exact path="search" element={<TableSearch />} />
              <Route exact path="insert" element={<TableInsert />} />
              <Route exact path="sql" element={<TableSql />} />
              <Route exact path="createsql" element={<TableCreateSql />} />
              <Route exact path="structure" element={<TableStructure />} />
              <Route exact path="operations" element={<TableOperations />} />
            </Route>
            
          </Route>

        </Route>



          </Route>

          





        </Route>



   
        <Route index path="*" element={<h2>WhereTF have you gone?!</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
