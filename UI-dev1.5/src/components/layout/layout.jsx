import { Outlet } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
import UpArrow from "./upArrow";
import BreadCrumbs from "./breadCrumbs";
import DbTableMenu from "./dbTableMenu";
import SystemErrorModal from "./systemErrorModal";
import './layout.css';
import ActionsRibon from "./actionsRibon";


export default function Layout(){
  
	return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Row>
              <Col>
                <h3 style={{cursor:"pointer"}}onClick={()=>window.location.href="/vulcan"}>phpSqlServAdmin <small style={{fontSize:"0.4em"}}>v2.2.0</small></h3>
                <small>Powered by <a href="https://github.com/itay-moav/TalisMS">TalisMS</a> and ReactJS</small>
              </Col>
            </Row>
            <Row>
              <Col>
                <DbTableMenu />
              </Col>
            </Row>
          </Col>

          <Col md={9}>
          <Row className="mb-3">
            <Col>
              <BreadCrumbs />
            </Col>
          </Row>

          <ActionsRibon />
          
          <Row>
            <Col>
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
