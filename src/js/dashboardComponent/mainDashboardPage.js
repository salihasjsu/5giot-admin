import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import CustomizedTable from "../sharedComponents/customizedTable";
import { assetColumns, userColumns } from "../sharedComponents/tableColumns";
import { getAssets } from "../assetComponent/assetService";
import { getApolloClient } from "../apolloClient";
import { getUsers } from "../userComponent/userService";
export default function MainDashboardPage() {
  const columns = React.useMemo(() => assetColumns, []);
  const userTable = React.useMemo(() => userColumns, []);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(
    () => {
      let apolloClient = getApolloClient();
      if (!assets.length > 0) {
        apolloClient
          .query({
            query: getAssets,
          })
          .then((response) => {
            setAssets(response.data.assets);
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

            console.log(users);
            setUsers(usersList);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [users],
    [assets]
  );
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
      <div className="row"></div>
      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="bg-warning text-white">
              Statistics
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
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
              <CustomizedTable columns={columns} data={assets} />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
}
