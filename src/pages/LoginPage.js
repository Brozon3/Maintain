import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = async () => {
    alert("Login not implemented yet.");
  };

  return (
    <>
      <Container
        className="container w-75"
        style={{ backgroundColor: "#F8F9FA", height: 800 }}
      >
        <h1> Log-in. </h1>
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
        <Button
          disabled={!emailValue || !passwordValue}
          variant="custom"
          color="#F8F9FA"
          onClick={onLoginClicked}
        >
          {" "}
          Log In{" "}
        </Button>
        <Button
          variant="custom"
          color="#F8F9FA"
          onClick={() => navigate("/forgotPassword")}
        >
          {" "}
          Forgot Password?{" "}
        </Button>
        <Button
          variant="custom"
          color="#F8F9FA"
          onClick={() => navigate("/signUp")}
        >
          {" "}
          Don't have an account? Sign Up!{" "}
        </Button>
      </Container>
    </>
  );
};

export default LoginPage;
