import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Routes,Route,useNavigate} from "react-router-dom";
import Layout from "./components/layout";
import {fetchServers} from "./store/serversSlice";
import { LoadStatus } from './services/enums';

//pages
import Servers from './routes/servers';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchServersStatus = useSelector(state=>state.servers.loadStatus);

  useEffect(
    ()=>{
      if(fetchServersStatus === LoadStatus.IDLE){
        dispatch(fetchServers());
      }
      navigate('servers');    
    },[fetchServersStatus,dispatch]
  );
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="servers" element={<Servers />} />
        <Route path="servers/:server" element={<h2>aserver</h2>} />
        <Route path="servers/:server/databases" element={<h2>databases</h2>} />
        <Route path="servers/:server/databases/:database" element={<h2>a databases</h2>} />
        <Route path="servers/:server/databases/:database/tables" element={<h2>tables</h2>} />
        <Route path="servers/:server/databases/:database/tables/:table" element={<h2>a table</h2>} />
      </Route>
      <Route path="*" element={<h2>WTF have you gone?!</h2>} />

    </Routes>
  );
}

export default App;
