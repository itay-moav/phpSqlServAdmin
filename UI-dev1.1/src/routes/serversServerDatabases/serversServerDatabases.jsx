import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from "react-router-dom";
import useCurrents from "../../services/useCurrents";

export default function ServersServerDatabases(){
    const currentServer = useCurrents().server;

    //Read list of databases from state
    const databaseListSelector = state => {
            if(currentServer && state.servers.databaseList[currentServer]){//server has dabases loaded in state
                return Object.keys(state.servers.databaseList[currentServer]);
            } 
            return [];
    };
    const databaseList  = useSelector(databaseListSelector);

    //Try to load the list of databases for the selcted connection from the backend
    useEffect(
        ()=>{
            if(databaseList.length === 0){
                //dispatch load databases
            }
        },
        [currentServer,databaseList]
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
