import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const SelectServer = () => {

    const servers  = useSelector(state => {
        return Object.keys(state.servers.databaseList);
    });

    return (
        <div style={{"marginTop":"50px"}}>
        <h2>Select from the following configured servers</h2>
        {servers.map(server => 
        (<Link key={server} to={`/server/${server}`} className="btn btn-primary btn-block btn-lg" style={{"textAlign":"left"}}>
            {server}
        </Link>) )}
        </div>
     );
}
 
export default SelectServer;