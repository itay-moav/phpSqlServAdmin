import { NavLink } from "react-router-dom";
import useCurrents from "../../services/useCurrents";

export default function BreadCrumbs(){
    const current = useCurrents();
    
    return (
      <header className="page-head-wrapper">     
        <span className="header-breadcrumbs">
          <NavLink to="/server">
          <span className="db-element-clickable">
            <i className="btn fa fa-server" aria-hidden="true"></i> 
          </span >
          </NavLink>
          
          {
            current.server && (
              <NavLink to={`/server/${current.server}/database`}>
              <span className="db-element-clickable">
                {current.server}
              </span >
              </NavLink>
            )
          }
  

          {
            current.database && (
            <>
            {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i> 
    
            <NavLink to={`/server/${current.server}/database/${current.database}/objects`}>
            <span className="db-element-clickable">
              <i className="btn fa fa-database" aria-hidden="true"></i>
              {current.database}
            </span>
            </NavLink>
            </>
            )
          }


          {current.schema && (
            <>
            {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i>

            <NavLink to={`/server/${current.server}/database/${current.database}/schema/${current.schema}/tables`}>
            <span className="db-element-clickable">
              <i className="btn fa fa-cubes" aria-hidden="true"></i>
              {current.schema}
            </span>
            </NavLink>
            </>
            )
          }
  
  
          {current.table && 
            (
            <>
            {' '}
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            
            <NavLink to={`/server/${current.server}/database/${current.database}/schema/${current.schema}/tables/${current.table}/structure`}>
            <span>
              <i className="btn fa fa-table" aria-hidden="true"></i>
              {current.table}
            </span>
            </NavLink>
            </>
            )
          }
  
        </span>
      </header>
    );    
}
