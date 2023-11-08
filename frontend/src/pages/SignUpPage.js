import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../auth/useToken.js";

export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signup", {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    // navigate("/displayProperties");
    // navigate(`/please-verify?email=${encodeURIComponent(emailValue)}`);
    navigate(`/please-verify`);
  };

  return (
    <>
      <Container
        className="container w-75"
        style={{ backgroundColor: "#F8F9FA", height: 800 }}
      >
        <h1> Sign Up. </h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Form.Group className="mb-3">
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control
            placeholder="email@example.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
          />
        </Form.Group>
        <hr></hr>

        <Button
          disabled={
            !emailValue ||
            !passwordValue ||
            passwordValue !== confirmPasswordValue
          }
          className="green-button"
          onClick={onSignUpClicked}
        >
          {" "}
          Sign Up{" "}
        </Button>

        <Button
          variant="custom"
          color="#F8F9FA"
          onClick={() => navigate("/loginPage")}
        >
          {" "}
          Already have an account? Log In!{" "}
        </Button>
      </Container>
    </>
  );
};

export default SignUpPage;
