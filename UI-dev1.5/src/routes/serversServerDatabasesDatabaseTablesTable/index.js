import { Outlet } from "react-router-dom";
import TableBrowse from "./subroutes/browse";
import TableFields from "./subroutes/fields";
import TableCreateSql from "./subroutes/createSql";
import TableSql from "./subroutes/sql";


export default function ServersServerDatabasesDatabaseTablesTable(){

    return <Outlet />
}

export {TableBrowse,TableFields,TableCreateSql,TableSql};
