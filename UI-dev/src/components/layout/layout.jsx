import React from "react";
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
  const currentServer = useSelector(state => state.databases.server);
  const currentDB     = useSelector(state => state.databases.current);
  const currentTable  = useSelector(state => state.ui.currentTable);

  return (
    <header className="page-head-wrapper">     
      {currentDB && (
      <span className="header-breadcrumbs">
        
        <span className="db-element-clickable">
          <i className="btn fa fa-server" aria-hidden="true"></i> 
          {currentServer}
        </span >
        {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i> 

         
        <span className="db-element-clickable">
          <i className="btn fa fa-database" aria-hidden="true"></i>
          {currentDB}
        </span> 

        {currentTable && 
          (
          <>
          {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i>
          <span className="db-element-clickable">
            <i className="btn fa fa-table" aria-hidden="true"></i>
            {currentTable}
          </span> 
          </>
          )
        }

      </span>)}
    </header>
  );
}