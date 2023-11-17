import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmitClicked = async () => {
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
      <Container className="main">
        <h1 className="mb-3 p-3 blue-header">Success</h1>
        <p className="my-2 blue-secondary-header">
          A reset link has been sent to you email.
        </p>
      </Container>
    </>
  ) : (
    <Container className="main">
      <h1 className="mb-3 p-3 blue-header">Forgot Password</h1>
      <p className="my-2 blue-secondary-header">
        Enter email and we'll send a reset link.
      </p>
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
        <hr></hr>

        <Button
          type="submit"
          className="green-button mx-3"
          disabled={!emailValue}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};
