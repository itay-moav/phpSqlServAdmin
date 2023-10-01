import { useDispatch,useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useConnectionCurrents from "../../services/useConnectionCurrents";
import { loadTableStructure,tableStructure } from "../../store/dbTreeSlice";

import TableBrowse from "./subroutes/browse";
import TableSearch from "./subroutes/search";
import TableInsert from "./subroutes/insert";
import TableStructure from "./subroutes/structure";
import TableCreateSql from "./subroutes/createSql";
import TableSql from "./subroutes/sql";
import TableOperations from "./subroutes/operations";

/**
 * Intilizes all table related store
 * Abstract away all the structure and
 * other pieces checks in child routes
 * 
 * @returns 
 */
export default function ServersServerDatabasesDatabaseSchemaTablesTable(){
    const dispatch = useDispatch();
    const {server,database,schema,table,connectionName} = useConnectionCurrents();
    const structure = useSelector(tableStructure(server,database,schema,table));

    if(!structure){
        dispatch(loadTableStructure({connectionName,server,database,schema,table}));
        return null;
    }
    return <Outlet />
}

export {TableBrowse,TableStructure,TableCreateSql,TableSql,TableOperations,TableSearch,TableInsert};
