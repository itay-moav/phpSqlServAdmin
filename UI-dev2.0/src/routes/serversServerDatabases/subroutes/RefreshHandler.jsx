import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useCurrents from "../../../services/useCurrents";
import { findConnectionNameByServer,findConnectionNameByServerAndDb, loadDatabases, loadDatabaseTables } from "../../../store/dbTreeSlice";

export default function RefreshHandler(){
    //console.log('I need to come clean here, I have no idea how I made this refresh handler to work.');
    const [refreshed,setRefreshed]=useState(false);
    const {server,database,schema,table} = useCurrents();
    const connectionNameByServer = useSelector(findConnectionNameByServer(server));
    const connectionNameByDb = useSelector(findConnectionNameByServerAndDb(server,database));
    const dispatch = useDispatch();
    if(!connectionNameByDb){
        console.log('Handling Refresh on DB level for ',connectionNameByServer,server,database,schema,table);
        dispatch(loadDatabases({connectionName:connectionNameByServer,currentServer:server})).then(()=>{
            dispatch(loadDatabaseTables({connectionName:connectionNameByServer,server,database})).then(()=>{
                console.log('finished refresh?');
                setRefreshed(true);
            });

        });
    } else if(!refreshed){//if no condition, setRefresh will keep rerendering in infinite loop
        setRefreshed(true);
    }

    return refreshed ? <Outlet /> : null;
}