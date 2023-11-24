import {useSelector} from 'react-redux';
import {NavLink} from "react-router-dom";
import { serversList } from '../../store/dbTreeSlice';

export default function ServerIndex(){
  const servers = useSelector(serversList());
  
  const serverLinks = servers.map(server => 
    (<NavLink key={server} to={`/server/${server}/database`} 
              className="btn btn-primary btn-block btn-lg" 
              style={{"textAlign":"left"}}>
        {server}
    </NavLink>));
    
  return (
      <div style={{"marginTop":"50px"}}>
      <h2>Select from the following configured servers</h2>
      {serverLinks}
      </div>
    );
}