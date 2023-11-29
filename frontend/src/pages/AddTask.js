import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { UseUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Modal } from "react-bootstrap";

export const AddTask = () => {

  const user = UseUser();
  const [token, setToken] = useToken();
  const { id, email, isVerified } = user;
  const [message, setMessage] = useState("");
  const [addedOrExists, setAddedOrExists] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { propertyID } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const getApplianceTypes = async () => {
    const result = await axios.get("/api/applianceTypes");
    if (result.data.applianceTypes) {
      setProperties(result.data.user)
    }
  }

  const [applianceTypes, setApplianceTypes] = useState([]);

  useEffect(() => {
    getApplianceTypes();
    console.log(applianceTypes);
  }, [])
  

  const onSubmit = async (data) => {
    const response = await axios.post("/api/addTask", {
      user: user,
      propertyID: propertyID,
      data: data
    });
    handleOpen();
    setMessage(response.data.message);
    reset();
  };

  return (
  <>
    <Container className="container main">
      <h1 className="mb-3 p-3 blue-header">Add a Task</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="container w-50 justify-content-center"
      >
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="description">
            Task Description:{" "}
          </Form.Label>
          <Form.Control
            placeholder="Clean the cat litter"
            id="description"
            {...register("description", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="frequency">
            Frequency:{" "}
          </Form.Label>
          <Form.Select
            id="frequency"
            {...register("frequency", { required: true })}
          >
            <option value={"Once"}>Once</option>
            <option value={"7 DAYS"}>Weekly</option>
            <option value={"14 DAYS"}>Bi-Weekly</option>
            <option value={"1 MONTH"}>Monthly</option>
            <option value={"2 MONTHS"}>Bi-Monthly</option>
            <option value={"3 MONTHS"}>Quarterly</option>
            <option value={"6 MONTHS"}>Semi-Annually</option>
            <option value={"1 YEAR"}>Annually</option>
            <option value={"2 YEARS"}>Bi-Annually</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="applianceType">
            Appliance Type:{" "}
          </Form.Label>
          <Form.Select
            id="applianceType"
            {...register("applianceType", { required: true })}
          >
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="dueDate">
            Complete by:{" "}
          </Form.Label>
          <Form.Control
            type="date"
            id="dueDate"
            {...register("dueDate", { required: true })}
          />
        </Form.Group>

        <hr></hr>

        <Button type="submit" className="green-button mx-3">
          Submit
        </Button>
      </Form>
    </Container>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="blue-text">
            Property {addedOrExists}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="blue-text">{message}</Modal.Body>
        <Modal.Footer>
          <Button
            className="blue-button"
            onClick={() => navigate("/displayProperties")}
          >
            View Properties
          </Button>
          <Button className="green-button" onClick={handleClose}>
            Add Another Property
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
};
