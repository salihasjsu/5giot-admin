import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CustomizedTable from "../sharedComponents/customizedTable";
import { assetColumns, userColumns } from "../sharedComponents/tableColumns";
import { getAssets } from "../assetComponent/assetService";
import { getApolloClient } from "../apolloClient";
import { getUsers } from "../userComponent/userService";
import { getWSClient } from "../websocketClient";
import Chart from "chart.js";
import { chartConfig } from "../sharedComponents/chartConfig";
export default function MainDashboardPage() {
  const columns = React.useMemo(() => assetColumns, []);
  const userTable = React.useMemo(() => userColumns, []);
  const [assetsMain, setAssetsMain] = useState([]);
  const [users, setUsers] = useState([]);
  const [webSoc, setWebSoc] = useState(null);
  const chartCont = useRef(null);
  const [chartObj, setChartObj] = useState(null);
  useEffect(() => {
    if (!webSoc) {
      setWebSoc(getWSClient());
      return () => {
        if (webSoc) webSoc.close();
      };
    }
  }, []);
  useEffect(() => {
    if (!chartObj) {
      if (chartCont && chartCont.current) {
        const newChartInst = new Chart(chartCont.current, chartConfig);
        setChartObj(newChartInst);
      }
    }
    console.log("chart instance", chartObj);
  }, [chartCont, chartObj]);
  useEffect(() => {
    console.log("websocket", webSoc);
    if (!webSoc) return;
    webSoc.onmessage = (e) => {
      const messageData = JSON.parse(e.data);
      console.log(messageData);
    };
  }, [webSoc]);
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
        <Col sm={4} style={{ fontSize: "1.5rem" }}>
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
          <Card style={{ height: "70vh" }}>
            <Card.Header className="bg-warning text-white">
              Statistics
            </Card.Header>
            <Card.Body style={{ overflow: "scroll" }}>
              <canvas
                ref={chartCont}
                width={"30%"}
                height={"8%"}
                options={{ maintainAspectRatio: false }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6"></Col>
        <Col sm="6">
          <Card style={{ height: "40vh", overflow: "scroll" }}>
            <Card.Header className="bg-primary text-white">Users</Card.Header>
            <Card.Body>
              <CustomizedTable columns={userTable} data={users} />
            </Card.Body>
          </Card>
        </Col>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="bg-info text-white">Map</Card.Header>
            <Card.Body style={{ backgroundColor: "white" }}>
              <Card.Text></Card.Text>
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
