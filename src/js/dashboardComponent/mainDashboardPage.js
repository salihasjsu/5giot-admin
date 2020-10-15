import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CustomizedTable from "../sharedComponents/customizedTable";
import { assetColumns, userColumns } from "../sharedComponents/tableColumns";
import { getAssets } from "../assetComponent/assetService";
import { getApolloClient } from "../apolloClient";
import { getUsers } from "../userComponent/userService";
import Map from "../realTimeDataComponent/map";
import RealTimePage from "../realTimeDataComponent/realtimePage";
import { chartConfig } from "../sharedComponents/chartConfig";
import Chart from "chart.js";
export default function MainDashboardPage() {
  const columns = React.useMemo(() => assetColumns, []);
  const userTable = React.useMemo(() => userColumns, []);
  const [assetsMain, setAssetsMain] = useState([]);
  const [users, setUsers] = useState([]);
  const chartMain = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (chartMain && chartMain.current) {
      console.log("Creating New chart instance");
      const newChartInst = new Chart(chartMain.current, chartConfig());
      setChart(newChartInst);
    }
  });

  useEffect(() => {
    let apolloClient = getApolloClient();
    if (!assetsMain.length > 0) {
      apolloClient
        .query({
          query: getAssets,
        })
        .then((response) => {
          setAssetsMain(response.data.assets);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (!users.length > 0) {
      apolloClient
        .query({
          query: getUsers,
        })
        .then((response) => {
          let usersList = [];
          usersList = response.data.users.map((obj) => {
            return {
              name: obj.firstName + " " + obj.lastName,
              role: obj.role,
              contactNumber: obj.contactNumber,
            };
          });

          // console.log(users);
          setUsers(usersList);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [users, assetsMain]);
  return (
    <div>
      <div className="row">
        <Col sm={5} style={{ fontSize: "1.5rem" }}>
          {new Date().toLocaleString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            time: "numeric",
          })}
        </Col>
        <Col style={{ fontSize: "1.5rem" }}>
          {" "}
          {new Date().toLocaleTimeString()}
        </Col>
      </div>
      <hr />
      <Row>
        <Col sm="12">
          <Card style={{ height: "50vh" }}>
            <Card.Header className="bg-warning text-white">
              Statistics
            </Card.Header>
            <Card.Body style={{ overflow: "scroll" }}>
              <RealTimePage
                width={"20%"}
                height={"5%"}
                showBtn={false}
                chartMain={chartMain}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="12">
          <Card style={{ height: "50vh" }}>
            <Card.Header className="bg-info text-white">Map</Card.Header>
            <Card.Body style={{ backgroundColor: "white", overflow: "scroll" }}>
              <Map />
            </Card.Body>
          </Card>
        </Col>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh", overflow: "scroll" }}>
            <Card.Header className="bg-primary text-white">Users</Card.Header>
            <Card.Body>
              <CustomizedTable columns={userTable} data={users} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6">
          <Card style={{ height: "40vh", overflow: "scroll" }}>
            <Card.Header className="bg-success text-white">Assets</Card.Header>
            <Card.Body style={{ backgroundColor: "white" }}>
              <CustomizedTable columns={columns} data={assetsMain} />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
}
