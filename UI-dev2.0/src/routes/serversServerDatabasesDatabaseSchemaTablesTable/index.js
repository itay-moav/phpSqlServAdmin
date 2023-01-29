import { Outlet } from "react-router-dom";
import TableBrowse from "./subroutes/browse";
import TableSearch from "./subroutes/search";
import TableStructure from "./subroutes/structure";
import TableCreateSql from "./subroutes/createSql";
import TableSql from "./subroutes/sql";
import TableOperations from "./subroutes/operations";


export default function ServersServerDatabasesDatabaseSchemaTablesTable(){

    return <Outlet />
}

export {TableBrowse,TableStructure,TableCreateSql,TableSql,TableOperations,TableSearch};
