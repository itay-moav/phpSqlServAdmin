import { NavLink } from "react-router-dom";
import useCurrents from "../../services/useCurrents";
import useBaseUrl from "../../services/useBaseUrl";

export default function BreadCrumbs(){
    const current = useCurrents();
    const baseUrl = useBaseUrl();
    
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
              <NavLink to={`${baseUrl('server')}/database`}>
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
    
            <NavLink to={`${baseUrl('database')}/objects`}>
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

            <NavLink to={`${baseUrl('schema')}/objects`}>
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
            
            <NavLink to={`${baseUrl('table')}/structure`}>
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
