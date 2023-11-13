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
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return success ? (
    <>
      <h1>Success</h1>
      <p>A reset link has been sent to you email.</p>
    </>
  ) : (
    <>
      <Container className="text-center main">
        <h1>Forgot Password</h1>
        <p>Enter email and we'll send a rest link.</p>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Form onSubmit={handleSubmitClicked}>
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
        <Button type="submit" className="green-button" disabled={!emailValue}>
          Submit
        </Button>
      </Container>
    </>
  );
};
