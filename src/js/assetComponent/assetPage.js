import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import "../../styles/asset.css";
import { getApolloClient } from "../apolloClient";
import CustomizedTable from "./customizedTable";
export default function AssetPage() {
  const [assets, setAssets] = useState([]);

  const [editIndex, setEditIndex] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [assetObj, setAssetObj] = useState(initAsset());
  useEffect(() => {
    if (!assets.length > 0) initializeAssetsApi();
  }, []);
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
        Header: "Edit/Delete",
        id: "delete",
        accessor: (str) => "delete",
        style: { width: "15%" },

        Cell: (tableProps) => (
          <div>
            <Button
              variant="warning"
              style={{ padding: "5" }}
              onClick={(e) => {
                let dataCopy = assets[tableProps.row.index];
                setAssetObj(dataCopy);
                setEditIndex(tableProps.row.index);
                setIsAdd(false);
                showAddModal();
              }}
            >
              {" "}
              <span style={{ padding: "5px" }}>
                <i>
                  <FontAwesomeIcon icon={faEdit} />
                </i>
              </span>
            </Button>
            <Button
              variant="danger"
              style={{ margin: "5px" }}
              onClick={(e) => {
                let dataCopy = {};
                dataCopy = [...assets];

                console.log("Assets in delete", assets);
                deleteAsset(dataCopy[tableProps.row.index])
                  .then((response) => {
                    if (response.data.deleteAsset.code == "200") {
                      dataCopy.splice(tableProps.row.index, 1);
                      setAssets(dataCopy);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {" "}
              <span style={{ margin: "5px" }}>
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </span>
            </Button>
          </div>
        ),
      },
    ],
    [assets]
  );
  const [showAdd, setShowAdd] = useState(false); //for Modal Dialog boc

  function initAsset() {
    return {
      _id: "",
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
    console.log("Show model -assets", assets);
    setShowAdd(true);
  };
  function handleAddClose() {
    setAssetObj(initAsset());
    setShowAdd(false);
    setIsAdd(true);
  }
  const initializeAssetsApi = () => {
    queryAssets()
      .then((response) => {
        setAssets(response.data.assets);
      })
      .catch((err) => {
        console.error(err);
      });
    return "";
  };

  const addAssetTable = () => {
    setError({ isError: false, message: "" });
    if (!validateAsset()) {
      setError({ isError: true, message: "All fields are required." });
      return;
    }
    postAsset("add")
      .then((response) => {
        console.log(response.data);
        assetObj._id = response.data.addAsset.message;
        setAssets((prevState) => [...prevState, assetObj]);
        setShowAdd(false);
        setAssetObj(initAsset());
      })
      .catch((err) => console.error(err));
  };
  const editAssetTable = () => {
    postAsset("edit")
      .then(() => {
        let copyData = [...assets];
        copyData[editIndex] = assetObj;
        console.log(editIndex);
        setAssets(copyData);
        setEditIndex(-1);
        setShowAdd(false);
        setIsAdd(true);
        setAssetObj(initAsset());
      })
      .catch((err) => console.error(err));
  };
  function validateAsset() {
    return (
      assetObj.manufacturer.length > 0 &&
      assetObj.name.length > 0 &&
      assetObj.imei.length > 0
    );
  }
  /***************** Apollo Queries ******************/

  const addAsset = gql`
    mutation addAsset(
      $name: String!
      $manufacturer: String!
      $imei: String!
      $status: String!
    ) {
      addAsset(
        name: $name
        manufacturer: $manufacturer
        imei: $imei
        status: $status
      ) {
        code
        isError
        message
      }
    }
  `;

  const updateAsset = gql`
    mutation updateAsset(
      $_id: String
      $name: String!
      $manufacturer: String!
      $imei: String!
      $status: String!
    ) {
      updateAsset(
        _id: $_id
        name: $name
        manufacturer: $manufacturer
        imei: $imei
        status: $status
      ) {
        code
        isError
        message
      }
    }
  `;

  const getAssets = gql`
    query Assets {
      assets {
        _id
        name
        manufacturer
        imei
        status
      }
    }
  `;

  const removeAsset = gql`
    mutation DeleteAsset($_id: String!) {
      deleteAsset(_id: $_id) {
        code
        isError
        message
      }
    }
  `;

  async function postAsset(action) {
    let apolloClient = getApolloClient();
    if (action === "add") {
      return apolloClient.mutate({
        mutation: addAsset,
        variables: {
          name: assetObj.name,
          manufacturer: assetObj.manufacturer,
          imei: assetObj.imei,
          status: assetObj.status,
        },
      });
    } else if (action == "edit") {
      return apolloClient.mutate({
        mutation: updateAsset,
        variables: {
          _id: assetObj._id,
          name: assetObj.name,
          manufacturer: assetObj.manufacturer,
          imei: assetObj.imei,
          status: assetObj.status,
        },
      });
    }
  }
  async function queryAssets() {
    let apolloClient = getApolloClient();
    return apolloClient.query({
      query: getAssets,
    });
  }
  async function deleteAsset(obj) {
    let apolloClient = getApolloClient();
    return apolloClient.mutate({
      mutation: removeAsset,
      variables: {
        _id: obj._id,
      },
    });
  }
  /***********************END************************* */
  return (
    <div>
      <Card style={{ overflow: "scroll", height: "500px" }}>
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
              <span style={{ padding: "5px" }}>
                <i>
                  <FontAwesomeIcon icon={faPlus} />
                </i>
              </span>
              ADD
            </Button>{" "}
          </Row>
          <div id="customTable">
            <CustomizedTable columns={columns} data={assets} />
          </div>
        </Card.Body>
      </Card>

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
                value={assetObj.status}
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
          <Button
            variant="primary"
            onClick={addAssetTable}
            className={isAdd ? "not-hidden" : "hidden"}
          >
            Add
          </Button>
          <Button
            variant="primary"
            onClick={editAssetTable}
            className={!isAdd ? "not-hidden" : "hidden"}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
