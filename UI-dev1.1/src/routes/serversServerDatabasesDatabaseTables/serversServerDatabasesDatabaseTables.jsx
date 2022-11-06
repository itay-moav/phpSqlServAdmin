import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { findConnectionNameByDbOrServer,loadDatabaseTables } from '../../store/dbTreeSlice';
import QueryEditor from "../../components/query/queryEditor";
import LastQuery from "../../components/query/lastQuery";
import QueryResults from "../../components/query/queryResults";



export default function ServersServerDatabasesDatabaseTables(){
    const dispatch = useDispatch();
    const {server,database} = useCurrents();
    const connectionName = useSelector(findConnectionNameByDbOrServer(server,database));
    useEffect(
        ()=>{
            if(database){
                dispatch(loadDatabaseTables({connectionName,server,database}));
            }
        },[]
    );

    return (
        <>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
        </>
    );
}
