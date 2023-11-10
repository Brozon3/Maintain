import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = async () => {
    const response = await axios.post("/api/login", {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/displayProperties");
  };

  return (
    <Container className="container main">
      <h1 className="mb-3 blue-header">Login</h1>
      <Form className="container w-50 justify-content-center">
            
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="email">Your Email Address: </Form.Label>
          <Form.Control
            id="email"
            placeholder="email@example.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="password">Password: </Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>
        <hr></hr>
        <Row>
          <Col>
            <Button disabled={!emailValue || !passwordValue} className="green-button mb-3" onClick={onLoginClicked}>
              Log In
            </Button>
          </Col>
          <Col>
            <Button className="green-button mb-3" onClick={() => navigate("/signUpPage")}>
              Sign Up
            </Button>
          </Col>
        </Row>

        <Button className="green-button mb-3" onClick={() => navigate("/forgotPassword")}>
          Forgot Password
        </Button>
      
      </Form>
     </Container>   
  );
};

export default LoginPage;
