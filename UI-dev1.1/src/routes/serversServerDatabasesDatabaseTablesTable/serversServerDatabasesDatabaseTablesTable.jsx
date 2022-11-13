import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../store/dbTreeSlice';
import { runQuery } from "../../store/querySlice";
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";

export default function ServersServerDatabasesDatabaseTablesTable(){
    const dispatch = useDispatch();
    const {server,database,table} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    useEffect(
        ()=>{
            dispatch(runQuery({connectionName,server,database,runBatched:1,query: `SELECT * FROM ${table}`}));
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
