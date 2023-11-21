import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { UseUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";

export const AddTask = () => {

  const user = UseUser();
  const [token, setToken] = useToken();
  const { id, email, isVerified } = user;

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  

  const onSubmit = async (data) => {
    console.log(data);
    reset();
    handleOpen();
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
            Task Name:{" "}
          </Form.Label>
          <Form.Control
            type="task-name"
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
            <option value={"Weekly"}>Weekly</option>
            <option value={"Bi-Weekly"}>Bi-Weekly</option>
            <option value={"Monthly"}>Monthly</option>
            <option value={"Bi-Monthly"}>Bi-Monthly</option>
            <option value={"Quarterly"}>Quarterly</option>
            <option value={"Semi-Annually"}>Semi-Annually</option>
            <option value={"Annually"}>Annually</option>
            <option value={"Bi-Annually"}>Bi-Annually</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="completeBy">
            Complete by:{" "}
          </Form.Label>
          <Form.Control
            type="date"
            id="completeBy"
            {...register("completeBy", { required: true })}
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
              Task Added
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="blue-text">
          That task was successfully added to this property.
      </Modal.Body>
      <Modal.Footer>
          <Button className="blue-button" onClick={() => navigate(-1)}>
              View Tasks
          </Button>
          <Button className="green-button" onClick={handleClose}>
              Add Another Task
          </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};
