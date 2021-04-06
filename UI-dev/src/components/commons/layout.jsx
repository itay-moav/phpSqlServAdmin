import React from "react";
import {useSelector} from 'react-redux';
import { Container, Row, Col,Button } from "react-bootstrap";
import UpArrow from "./upArrow";
import './layout.css';
import TableMenu from "./tableMenu";
import QueryEditor from "./queryEditor";
import LastQuery from "./lastQuery";
import QueryResults from "./queryResults";

export default function Layout(){
  const currentDB  = useSelector(state => state.databases.current);
	return (
		<>
      <header className="page-head-wrapper">
        <Container fluid>
          <Row>
            <Col md={12}>
				      <h1>phpSqlServAdmin {currentDB && (<span> => {currentDB}</span>)}</h1>
            </Col>
          </Row>
        </Container>
      </header>

      <Container fluid>
        <Row className="mt-5">
          <Col md={2}>
            <h1>tables</h1>
          </Col>
          
        </Row>

        <Row>
          <Col md={2}>
            <TableMenu />
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