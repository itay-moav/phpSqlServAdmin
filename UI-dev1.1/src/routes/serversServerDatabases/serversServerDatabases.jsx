import {NavLink} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import useCurrents from "../../services/useCurrents";
import { LoadStatus } from "../../services/enums";
import { fetchDatabases,findConnectionNameByServer } from '../../store/dbTreeSlice';
import { useEffect } from "react";

export default function ServersServerDatabases(){
    const currentServer = useCurrents().server;
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
            if(loadDbsStatus === LoadStatus.IDLE && databaseList.length === 0){
                dispatch(fetchDatabases({connectionName,currentServer}));
            }
        },[]
    );
    
    return ( 
        <div style={{"marginTop":"50px"}}>
        <h2>Databases in {currentServer} </h2>
        {databaseList.length > 0 && (databaseList.map(database => 
        (<NavLink key={database} to={`${database}/tables`} className="btn btn-primary btn-block btn-lg" style={{"textAlign":"left"}}>
            {database}
        </NavLink>) )
        )}
        </div>
        
    );
}
