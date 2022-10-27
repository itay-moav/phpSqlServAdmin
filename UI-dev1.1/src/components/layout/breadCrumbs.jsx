import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function BreadCrumbs(){
    const currentServer   = useSelector(state => state.servers.currentServer);
    const currentDatabase = useSelector(state => state.databases.currentDatabase);
    const currentTable    = useSelector(state => state.ui.currentTable);
    
    return (
      <header className="page-head-wrapper">     
        <span className="header-breadcrumbs">
          <NavLink to="/servers">
          <span className="db-element-clickable">
            <i className="btn fa fa-server" aria-hidden="true"></i> 
          </span >
          </NavLink>
          
          {
          currentServer && (
            <NavLink to={`/servers/${currentServer}`}>
            <span className="db-element-clickable">
              {currentServer}
            </span >
            </NavLink>
          )
          }
  
  
          {
          currentDatabase && (
          <>
          {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i> 
  
          <NavLink to={`/servers/${currentServer}/database/${currentDatabase}`}>
          <span className="db-element-clickable">
            <i className="btn fa fa-database" aria-hidden="true"></i>
            {currentDatabase}
          </span>
          </NavLink>
          </>
          )}
  
  
          {currentTable && 
            (
            <>
            {' '}
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
  
            <span>
              <i className="btn fa fa-table" aria-hidden="true"></i>
              {currentTable}
            </span> 
            </>
            )
          }
  
        </span>
      </header>
    );    
}