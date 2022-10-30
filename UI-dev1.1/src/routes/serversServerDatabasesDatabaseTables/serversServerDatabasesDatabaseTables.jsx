import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer } from '../../store/dbTreeSlice';
import { runQuery } from '../../store/querySlice';
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";



export default function ServersServerDatabasesDatabaseTables(){
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));

    useEffect(
        ()=>{
            const query="SELECT * FROM information_schema.tables ORDER BY table_name ASC";
            dispatch(runQuery({connectionName,database,query}));
        },[dispatch,connectionName,database]
    );

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
