import React, { useContext } from "react";
import { Nav, NavLink, Col, Row, Container } from "react-bootstrap";
import Sidebar from "./sidebar.js";
import Header from "./header.js";
import "../../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "./page";
import {
  faTachometerAlt,
  faChartArea,
  faUser,
  faMapMarker,
  faCubes,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import AppContext from "../appContext";

export default function Dashboard() {
  const appContext = useContext(AppContext);
  // console.log(appContext.globalState);
  return (
    <div className="dashboard-bg container-fluid ">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col sm="3" className="no-padding">
          {/* width={300} */}
          <Sidebar width={300} height={"100vh"}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="#">
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Dashboard</Col>
                </Row>
              </Nav.Link>
              <Nav.Link eventKey="link-0">
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faCubes}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Asset</Col>
                </Row>
              </Nav.Link>
              <Nav.Link eventKey="link-1">
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faChartArea}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Statistics</Col>
                </Row>
              </Nav.Link>
              <Nav.Link eventKey="link-2">
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faMapMarker}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Map</Col>
                </Row>
              </Nav.Link>
              <Nav.Link eventKey="link3">
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faRssSquare}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Real-Time Panel</Col>
                </Row>
              </Nav.Link>
            </Nav>
          </Sidebar>
        </Col>
        <Col sm={{ size: 12 }} className="no-padding">
          <Page />
        </Col>
      </Row>
    </div>
  );
}
