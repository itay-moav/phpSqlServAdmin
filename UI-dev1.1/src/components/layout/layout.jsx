import { Outlet } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
import UpArrow from "./upArrow";
import BreadCrumbs from "./breadCrumbs";
import DbTableMenu from "./dbTableMenu";
import SystemErrorModal from "./systemErrorModal";
import './layout.css';


export default function Layout(){
  
	return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Row>
              <Col>
                <h3 style={{cursor:"pointer"}}onClick={()=>window.location.href="/vulcan"}>phpSqlServAdmin</h3>
                <small>Powered by TalisMS and ReactJS</small>
              </Col>
            </Row>
            <Row>
              <Col>
                <DbTableMenu />
              </Col>
            </Row>
          </Col>

          <Col md={9}>
          <Row>
            <Col>
              <BreadCrumbs />
            </Col>
          </Row>
          <Row><Col>
            <SystemErrorModal />
            </Col>
          </Row>

          <Row>
            <Col><Outlet /></Col>
          </Row>

          </Col>
        </Row>
      </Container>
      <UpArrow />
      </>
	);
}