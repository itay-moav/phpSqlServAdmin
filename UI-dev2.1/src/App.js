import React,{useEffect} from 'react';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import Layout from "./components/layout";

//pages
import SqlQueryPage from './components/query/sqlQueryPage';

//server 
import ServerIndex from "./routes/server/serverIndex";

//database
import Databaseindex from './routes/server/database/databaseIndex';
import DatabaseObjects from './routes/server/database/databaseObjects';

//Table
import TableIndex from './routes/server/database/schema/table/tableIndex';
import Table, {TableBrowse,TableSearch,TableInsert,TableSql,TableCreateSql,TableStructure,TableOperations} from './routes/server/database/schema/table/table';

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
              <Route path="sql" element={<SqlQueryPage />} />
              <Route path="schema/:schema">
                <Route path="objects" element={<DatabaseObjects />} />
                <Route path="sql" element={<SqlQueryPage />} />      

                <Route path="table/:table" element={<Table />}>
                  <Route index element={TableIndex} />
                  
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
