import { useDispatch,useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import useConnectionCurrents from "../../../../../services/useConnectionCurrents";//TODO replace
import { loadTableStructure, tableStructure } from "../../../../../store/dbTreeSlice";

import TableBrowse from "./browse";
import TableSearch from "./search";
import TableInsert from "./insert";
import TableStructure from "./structure";
import TableCreateSql from "./createSql";
import TableSql from "./sql";
import TableOperations from "./operations";

/**
 * Intilizes all table related store
 * Abstract away all the structure and
 * other pieces checks in child routes
 * 
 * @returns 
 */
export default function Table(){
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