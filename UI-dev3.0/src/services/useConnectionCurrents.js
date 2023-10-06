import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { findConnectionNameByServerAndDb } from '../store/dbTreeSlice';

export default function useConnectionCurrents(){
    const currents =  {
        server: useParams().server  || false,
        database: useParams().database || false,
        schema: useParams().schema || false,
        table: useParams().table || false
    }
    currents.connectionName = useSelector(findConnectionNameByServerAndDb(currents.server,currents.database));
    return currents;
}

//TODO I need to delete this and modify config on server to match!