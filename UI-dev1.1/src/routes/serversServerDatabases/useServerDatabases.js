import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { LoadStatus } from "../../services/enums";
import { fetchDatabases,findConnectionNameByServer } from '../../store/dbTreeSlice';

/**
 * Fetches the list of databases available to the current selected server
 */
export default function useServerDatabases(currentServer){
    const dispatch = useDispatch();
    const connectionName = useSelector(findConnectionNameByServer(currentServer));

    //Read list of databases from state
    const databaseListSelector = state => {
        if(currentServer && state.dbTree.tree[currentServer].databases){//server has dabases loaded in state
            return Object.keys(state.dbTree.tree[currentServer].databases);
        } 
        return [];
    };
    const databaseList  = useSelector(databaseListSelector);
    const loadDbsStatus = useSelector(state => state.dbTree.databasesLoadStatus);

    //Try to load the list of databases for the selected connection from the backend
    useEffect(
        ()=>{
            console.log('lllll',loadDbsStatus);
            if(loadDbsStatus === LoadStatus.IDLE && databaseList.length === 0){
                //making it an async-await 
                console.log('LAUNCH');
                dispatch(fetchDatabases({connectionName,currentServer}));
                //dispatch load databases
                //fetchDb();
            }
        },
        [loadDbsStatus,connectionName,currentServer,databaseList,dispatch]
    );
    return databaseList;
}
