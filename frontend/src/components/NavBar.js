import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UseUser } from "../auth/useUser";
import { LoginModal } from "../pages/auth/LoginModal.js";
import { useToken } from "../auth/useToken";

export const NavBar = ({ loggedIn, setLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [, setToken] = useToken();
  const navigate = useNavigate();

  const user = UseUser();

  const urlParams = new URLSearchParams(window.location.search);
  const oauthToken = urlParams.get("token");

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      setLoggedIn(true);
    }
  }, [oauthToken, setToken, navigate, setLoggedIn]);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user, setLoggedIn]);

  const logOutHandler = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary border border-success" id="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={require("../MaintainLogo.png")}
              width="150"
              height="95"
              alt="Maintain logo"
            />
          </Navbar.Brand>
          {loggedIn && (
            <Nav className="me-auto">
              <Nav.Link className="green-text" href="/displayProperties">
                <h4>Properties</h4>
              </Nav.Link>
            </Nav>
          )}
          {loggedIn && (
            <Nav>
              <Nav.Link className="green-text" href="#" onClick={logOutHandler}>
                <h4>Logout</h4>
              </Nav.Link>
            </Nav>
          )}
          {!loggedIn && (
            <Nav>
              <Nav.Link
                className="green-text"
                href="#login"
                onClick={setShowLoginModal}
              >
                <h4>Login</h4>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <LoginModal
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        show={showLoginModal}
        setShow={setShowLoginModal}
      />
    </>
  );
};
