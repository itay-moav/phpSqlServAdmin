import React from "react";
import {useSelector} from 'react-redux';
import { Container, Row, Col,Button } from "react-bootstrap";
//import UpArrow from "./upArrow";
import './layout.css';
import DbTableMenu from "./dbTableMenu";
import QueryEditor from "../commons/queryEditor";
import LastQuery from "./lastQuery";
import QueryResults from "./queryResults";

export default function Layout(){
  
	return (
		<>
      <Container fluid>
        <Row>
          <Col md={2}>
            <h3>phpSqlServAdmin</h3>
            <small>Powered by TalisMS and ReactJS</small>
          </Col>
          <Col md={10}>
            <TopBreadcrumbs />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={2}>
            <DbTableMenu />
          </Col>
          <Col md={10}>
            <QueryEditor />
            <LastQuery />
            <QueryResults />
          </Col>
        </Row>
        
      </Container>
		</>
	);
}


function TopBreadcrumbs(){
  const currentServer = useSelector(state => state.databases.server);
  const currentDB     = useSelector(state => state.databases.current);

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
        {' '}<i className="fa fa-angle-double-right" aria-hidden="true"></i>

      </span>)}
    </header>  
  );
}