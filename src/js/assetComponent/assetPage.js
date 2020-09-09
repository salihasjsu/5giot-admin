import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Modal, Form } from "react-bootstrap";
import "../../styles/asset.css";
import CustomizedTable from "./customizedTable";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactDOM } from "react-dom";
export default function AssetPage() {
  const [assets, setAssets] = useState([
    {
      name: "ag15",
      imei: "1112332",
      manufacturer: "quectel",
      status: "active",
    },
    {
      name: "bg77",
      imei: "12312321",
      manufacturer: "quectel",
      status: "active",
    },
  ]);

  const [assetObj, setAssetObj] = useState(initAsset());
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      {
        Header: "IMEI Number",
        accessor: "imei",
      },
      {
        Header: "Manufacturer",
        accessor: "manufacturer",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: (str) => "delete",

        Cell: (tableProps) => (
          <Button
            variant="primary"
            onClick={(e) => {
              let dataCopy = {};
              dataCopy = [...assets];

              console.log("Assets in delete", assets);
              dataCopy.splice(tableProps.row.index, 1);

              setAssets(dataCopy);
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    [assets]
  );
  const [showAdd, setShowAdd] = useState(false); //for Modal Dialog boc

  function initAsset() {
    return {
      name: "",
      imei: "",
      status: "Active",
      manufacturer: "",
    };
  }

  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(
    () => {
      console.log("assets: ", assets);
    },
    [assets],
    [assetObj]
  );
  useEffect(() => {
    console.log("selected rows: ", selectedRows);
  }, [selectedRows]);
  /****************Methods ********************** */
  const onSelectedRows = (rows) => {
    //console.log("Row Selection");
    const mappedRows = rows.map((r) => r.original);
    setSelectedRows(mappedRows);
    //console.log("Selected Rows: ", selectedRows);
  };
  const showAddModal = () => {
    setAssetObj(initAsset());
    console.log("Show model -assets", assets);
    setShowAdd(true);
  };
  function handleAddClose() {
    setShowAdd(false);
  }

  function addAsset() {
    setError({ isError: false, message: "" });
    if (!validateAsset()) {
      setError({ isError: true, message: "All fields are required." });
      return;
    }

    setAssets((prevState) => [...prevState, assetObj]);

    setShowAdd(false);
  }
  function validateAsset() {
    return (
      assetObj.manufacturer.length > 0 &&
      assetObj.name.length > 0 &&
      assetObj.imei.length > 0
    );
  }
  function deleteAsset() {
    const splicedAsset = [...assets];
    for (var i = 0; i < selectedRows.length; i++) {
      var index = splicedAsset.indexOf(selectedRows[i]);
      splicedAsset.splice(index, 1);
    }
    setAssets(splicedAsset);
    setSelectedRows({});
  }
  return (
    <div>
      <Container className="asset-page">
        <Card>
          <Card.Header>
            <Card.Title>Assets</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Button
                variant="primary"
                className="button-asset"
                onClick={showAddModal}
              >
                <i>
                  <FontAwesomeIcon icon={faPlus} />
                </i>
                ADD
              </Button>{" "}
              <Button
                variant="danger"
                className="button-asset"
                disabled={selectedRows.length > 0 ? false : true}
                onClick={deleteAsset}
              >
                <i>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </i>
              </Button>
              <Button
                variant="warning"
                className="button-asset"
                disabled={selectedRows.length > 0 ? false : true}
              >
                <i>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </i>
              </Button>
            </Row>
            <div id="customTable">
              <CustomizedTable
                onSelectedRows={onSelectedRows}
                columns={columns}
                data={assets}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Modal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={assetObj.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setAssetObj((prevState) => {
                    return { ...prevState, name: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicImei">
              <Form.Label>IMEI Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="IMEI Number"
                value={assetObj.imei}
                onChange={(e) => {
                  const val = e.target.value;
                  setAssetObj((prevState) => {
                    return { ...prevState, imei: val };
                  });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicManufacturer">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Manufacture"
                value={assetObj.manufacturer}
                onChange={(e) => {
                  const val = e.target.value;
                  setAssetObj((prevState) => {
                    return { ...prevState, manufacturer: val };
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  const val = e.target.value;
                  setAssetObj((prevState) => {
                    return { ...prevState, status: val };
                  });
                }}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="error message">
              <div
                className={error.isError ? "alert alert-danger" : "hidden"}
                role="alert"
              >
                {error.message}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addAsset}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
