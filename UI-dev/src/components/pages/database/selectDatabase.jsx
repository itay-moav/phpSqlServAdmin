import React/*, { useEffect } */ from 'react';
import {useSelector} from 'react-redux';
import {Link,useRouteMatch} from "react-router-dom";

const SelectDatabase = () => {
    let match = useRouteMatch();
    const {selectedServer} = match.params;
    const databaseListSelector = state => {
            if(selectedServer && state.servers.databaseList[selectedServer]){
                return Object.keys(state.servers.databaseList[selectedServer]);
            }
            return [];
    };
    const databaseList  = useSelector(databaseListSelector);

    return ( 
        <div style={{"marginTop":"50px"}}>
        <h2>Databases in {selectedServer} </h2>
        {databaseList.length > 0 && (databaseList.map(database => 
        (<Link key={database} to={`/server/${selectedServer}/database/${database}`} className="btn btn-primary btn-block btn-lg" style={{"textAlign":"left"}}>
            {database}
        </Link>) )
        )}
        </div>
        
    );
}
export default SelectDatabase;
