import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../store/dbTreeSlice';
import { runQuery } from "../../store/querySlice";
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";

export default function ServersServerDatabasesDatabaseTablesTableStructure(){
    const dispatch = useDispatch();
    const {server,database,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const [schema,currentTable] = table.split('.');
    const query = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${schema}' AND TABLE_NAME='${currentTable}'`; 
    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,query,runBatched:1}));
        },[table]
    );

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
