import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../../auth/useToken";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const [config, setConfig] = useState({});

  const urlParams = new URLSearchParams(window.location.search);
  const oauthToken = urlParams.get("token");
  const navigate = useNavigate();

  //Check if there's a google user signed in.
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/displayProperties");
    }
  }, [oauthToken, setToken, navigate]);

  //Config oauth button
  useEffect(() => {
    axios
      .get("/api/oAuthConfig")
      .then((response) => setConfig(response.data))
      .catch((error) => console.error("Error fetching config:", error));
  }, []);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        console.log(e);
      }
    };
    loadOauthUrl();
  }, []);

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
      <h1 className="mb-3 p-3 blue-header ">Login</h1>
      <Form className="container w-50 justify-content-center">
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="email">
            Your Email Address:{" "}
          </Form.Label>
          <Form.Control
            id="email"
            placeholder="email@example.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="password">
            Password:{" "}
          </Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>
        <hr></hr>
        <Button
          disabled={!emailValue || !passwordValue}
          className="green-button mx-3"
          onClick={onLoginClicked}
        >
          Log In
        </Button>
        <Button
          className="green-button mx-3"
          onClick={() => navigate("/signUpPage")}
        >
          Sign Up
        </Button>
        <Button
          className="green-button mx-3"
          onClick={() => navigate("/forgotPassword")}
        >
          Forgot Password
        </Button>
        <GoogleOAuthProvider clientId={config}>
          <GoogleLogin
            render={(renderProps) => (
              <Button
                className="green-button mx-3"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" />
              </Button>
            )}
            onSuccess={(response) => {
              // Handle successful login
              console.log(response);
            }}
            onFailure={(error) => {
              // Handle login failure
              console.error(error);
            }}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      </Form>
    </Container>
  );
};
