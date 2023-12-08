import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../../auth/useToken";
import { FcGoogle } from "react-icons/fc";
import { EmailOrUsernameLoginFail } from "./EmailOrUsernameLoginFailModal";
import Modal from "react-bootstrap/Modal";

export const LoginModal = ({ loggedIn, setLoggedIn, show, setShow }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const [loginFailShow, setLoginFailShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const urlParams = new URLSearchParams(window.location.search);
  const oauthToken = urlParams.get("token");
  const navigate = useNavigate();

  //Check if there's a google user signed in.
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      setLoggedIn(true);
      navigate("/displayProperties");
    }
  }, [oauthToken, setToken, navigate, setLoggedIn]);

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
    try {
      const response = await axios.post("/api/login", {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      setToken(token);
      setLoggedIn(true);
      navigate("/displayProperties");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginFailShow(true);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <>
      <Container className="container main">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="blue-text">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="blue-text">
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
                Forgot Password?
              </Button>

              <Button
                className="google-sign-in-button m-3"
                variant="custom"
                disabled={!googleOauthUrl}
                onClick={() => {
                  window.location.href = googleOauthUrl;
                }}
              >
                <FcGoogle className="google-icon" />
                Log in with Google
              </Button>
            </Form>{" "}
          </Modal.Body>
          <Modal.Footer>
            <EmailOrUsernameLoginFail
              show={loginFailShow}
              setShow={setLoginFailShow}
            />
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
