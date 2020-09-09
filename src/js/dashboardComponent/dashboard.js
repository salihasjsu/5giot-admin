import {
  faChartArea,
  faCubes,
  faMapMarker,
  faRssSquare,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import "../../styles/dashboard.css";
import AssetPage from "../assetComponent/assetPage";
import Header from "./header.js";
import Page from "./page";
import Sidebar from "./sidebar.js";
export default function Dashboard() {
  /*************** DATA ****************** */
  const [showPage, setShowPage] = useState({
    isMain: true,
    isAsset: false,
    isStat: false,
    isMap: false,
  });
  /************** Methods ***************** */
  function showTab(prop) {
    setShowPage({ isMain: false, isAsset: false, isStat: false, isMap: false });
  }
  return (
    <div className="dashboard-bg container-fluid ">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col sm="3" className="no-padding">
          {/* width={300} */}
          <Sidebar width={280} height={"100vh"}>
            <Nav defaultActiveKey="dashboard" className="flex-column">
              <Nav.Link
                eventKey="dashboard"
                onClick={() =>
                  setShowPage({
                    isMain: true,
                    isAsset: false,
                    isStat: false,
                    isMap: false,
                  })
                }
              >
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
              <Nav.Link
                eventKey="asset"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: true,
                    isStat: false,
                    isMap: false,
                  })
                }
              >
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
              <Nav.Link
                eventKey="statistic"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: false,
                    isStat: true,
                    isMap: false,
                  })
                }
              >
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
              <Nav.Link
                eventKey="map"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: false,
                    isStat: false,
                    isMap: true,
                  })
                }
              >
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
        <Col sm="9">
          <div style={{ width: "1000px", paddingTop: "5%" }}>
            <div className={showPage.isMain ? "not-hidden" : "hidden"}>
              <Page />
            </div>
            <div className={showPage.isAsset ? "not-hidden" : "hidden"}>
              <AssetPage />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
