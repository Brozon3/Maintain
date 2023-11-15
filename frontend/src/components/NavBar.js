import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UseUser } from "../auth/useUser";

export const NavBar = ({ userState }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const user = UseUser();

  useEffect(() => {
    if (user) setLoggedIn(true);
    else setLoggedIn(false);
  }, [user]);

  const logOutHandler = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/loginPage");
  };

  if (loggedIn) {
    return (
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
          <Nav className="me-auto">
            <Nav.Link className="green-text" href="/">
              <h4>Properties</h4>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="green-text" href="#" onClick={logOutHandler}>
              <h4>Logout</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="bg-body-tertiary border border-success">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={require("../MaintainLogo.png")}
              width="150"
              height="95"
              alt="Maintain logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="green-text" href="/displayProperties">
              <h4>Properties</h4>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="green-text"
              href="#login"
              onClick={logOutHandler}
            >
              <h4>Login</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
};
