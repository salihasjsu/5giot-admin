import React from "react";
import { Card, Row, Col, Table, Container } from "react-bootstrap";
export default function page() {
  return (
    <Container>
      <div className="row" style={{ paddingTop: "10px" }}>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Statistics</Card.Header>
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="6">
          <Card style={{ height: "40vh" }}>
            <Card.Header>Users</Card.Header>
            <Card.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Admin</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
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
    </Container>
  );
}
