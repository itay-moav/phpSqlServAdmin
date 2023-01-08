import { Outlet } from "react-router-dom";
import TableBrowse from "./subroutes/browse";
import TableFields from "./subroutes/fields";
import TableCreateSql from "./subroutes/createSql";
import TableSql from "./subroutes/sql";
import TableOperations from "./subroutes/operations";


export default function ServersServerDatabasesDatabaseSchemaTablesTable(){

    return <Outlet />
}

export {TableBrowse,TableFields,TableCreateSql,TableSql,TableOperations};
