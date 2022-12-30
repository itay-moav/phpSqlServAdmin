import {useSelector} from 'react-redux';
import {NavLink} from "react-router-dom";

export default function Servers(){
  const servers = useSelector(state => {
      return Object.keys(state.dbTree.tree);
  });
  const serverList = servers.map(server => 
    (<NavLink key={server} to={`/servers/${server}/databases`} className="btn btn-primary btn-block btn-lg" style={{"textAlign":"left"}}>
        {server}
    </NavLink>));
    
  return (
      <div style={{"marginTop":"50px"}}>
      <h2>Select from the following configured servers</h2>
      {serverList}
      </div>
    );
}
