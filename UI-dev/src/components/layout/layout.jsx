import React from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';
import { Container,Row,Col } from "react-bootstrap";
import ErrorBoundry from "../commons/errorBoundry";
//import UpArrow from "./upArrow";
import './layout.css';
import DbTableMenu from "./dbTableMenu";


export default function Layout({children}){
  
	return (
		<>
      <Container fluid>
        <Row>
          
          <Col md={2}>
            <Row>
              <Col>
                <h3>phpSqlServAdmin</h3>
                <small>Powered by TalisMS and ReactJS</small>
              </Col>
            </Row>
            <Row>
              <Col>
                <DbTableMenu />
              </Col>
            </Row>
          </Col>

          <Col md={10}>
          <Row>
            <Col>
              <TopBreadcrumbs />
            </Col>
          </Row>

          <Row>
            <Col><ErrorBoundry>{children}</ErrorBoundry></Col>
          </Row>

          </Col>
        </Row>
      </Container>
		</>
	);
}

/**
 */
function TopBreadcrumbs(){
  const currentServer   = useSelector(state => state.servers.currentServer);
  const currentDatabase = useSelector(state => state.databases.currentDatabase);
  const currentTable    = useSelector(state => state.ui.currentTable);
  
  return (
    <header className="page-head-wrapper">     
      
      <span className="header-breadcrumbs">
        
        <NavLink to="/server">
        <span className="db-element-clickable">
          <i className="btn fa fa-server" aria-hidden="true"></i> 
        </span >
        </NavLink>
        
        {
        currentServer && (
          <NavLink to={`/server/${currentServer}`}>
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

        <NavLink to={`/server/${currentServer}/database/${currentDatabase}`}>
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