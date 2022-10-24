import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import {ServersActions} from "../../../store/servers";
import SelectDatabase from "../database/selectDatabase";

const ShowServer = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const {selectedServer} = match.params;

    useEffect( () => {
        dispatch(ServersActions.serverSelected({selectedServer}));
	},[dispatch,selectedServer] );

// TODO: this is just the selectDB option page fopr now, there will be more 
    return (<SelectDatabase />);
    
/*
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const {selectedServer} = match.params;

    useEffect( () => {
        dispatch(ServersActions.serverSelected({selectedServer}));
	},[dispatch,selectedServer] );

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
        
    );*/
}
 
export default ShowServer;