import {useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux';
import {NavLink} from "react-router-dom";
import {fetchServers} from "../../store/serversSlice";
import { LoadStatus } from '../../services/enums';

export default function Servers(){

  const dispatch = useDispatch();
  const fetchServersStatus = useSelector(state=>state.servers.loadStatus);

  useEffect(
    ()=>{
      if(fetchServersStatus === LoadStatus.IDLE){
        dispatch(fetchServers());
      }
    },[fetchServersStatus,dispatch]
  );

  const servers = useSelector(state => {
      return Object.keys(state.servers.databaseList);
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
