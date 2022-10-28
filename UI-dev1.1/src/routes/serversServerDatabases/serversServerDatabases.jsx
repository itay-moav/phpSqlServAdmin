//import { useEffect } from 'react';
//import {useSelector} from 'react-redux';
import useServerDatabases from './useServerDatabases';
import {NavLink} from "react-router-dom";
import useCurrents from "../../services/useCurrents";

export default function ServersServerDatabases(){
    const currentServer = useCurrents().server;
    const databaseList  = useServerDatabases(currentServer);

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
