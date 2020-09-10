import React, { useState } from "react";
import { Card, Col, Table } from "react-bootstrap";

export default function Page() {
  const [usersInformation, setUsersInformation] = useState([
    { id: "1", name: "ssss", emai: "asdsad", role: "asdsad" },
  ]);
  return (
    <div>
      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Statistics</Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {usersInformation.map((userInformation) => {
                    const userLink = `/home/users/${userInformation.id}`;
                    return (
                      <tr key="userInformation.id">
                        <td>{userInformation.id}</td>
                        <td>{userInformation.email}</td>
                        <td>{userInformation.role}</td>
                        <td>{userInformation.derniereCnx}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Users</Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </div>

      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Location</Card.Header>
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Assets</Card.Header>
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
}
