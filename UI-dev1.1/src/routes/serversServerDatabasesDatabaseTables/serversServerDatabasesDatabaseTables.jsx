import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer,fetchTableList,loadDatabaseTables } from '../../store/dbTreeSlice';
import { runQuery } from '../../store/querySlice';
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";



export default function ServersServerDatabasesDatabaseTables(){
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    const tableList = useSelector(fetchTableList(server,database));
console.log('TTTTT',tableList);
    useEffect(
        ()=>{
            if(database && tableList.length===0){
                dispatch(loadDatabaseTables({connectionName,server,database}));
            }
        },[connectionName,database,tableList]
    );

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
