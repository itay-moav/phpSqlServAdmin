import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
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

    //Try to load the list of databases for the selected connection from the backend
    useEffect(
        ()=>{
            if(databaseList.length === 0){
                //making it an async-await 
                const fetchDb = async () => {await dispatch(fetchDatabases({connectionName,currentServer}))};
                //dispatch load databases
                fetchDb();
            }
        },
        [connectionName,currentServer,databaseList,dispatch]
    );
    return databaseList;
}
