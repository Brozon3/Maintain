import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export const ForgotPasswordModal = ({ show, setShow }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const navigate = useNavigate();

  const handleSubmitClicked = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/forgotPassword/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(emailValue)}`);
      }, 3000);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return success ? (
    <>
      <Container className="container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="blue-text"> Success </Modal.Title>
          </Modal.Header>
          <Modal.Body className="blue-text">
            A reset link has been sent to you email.
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    </>
  ) : (
    <Container className="container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="blue-text">Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="blue-text">
          Enter your email and we'll send a reset link.
          {errorMessage && <div className="fail">{errorMessage}</div>}
          <Form
            onSubmit={handleSubmitClicked}
            className="container w-50 justify-content-center"
          >
            <Form.Group className="mb-3">
              <Form.Label className="blue-text" htmlFor="emailValue">
                Email:{" "}
              </Form.Label>
              <Form.Control
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="email@email.com"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="green-button mx-3"
            disabled={!emailValue}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
