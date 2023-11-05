import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const NavBar = ({userState}) => {

    if (userState === "loggedIn"){
        return(
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
                        <Nav.Link className="green-text" href="/"><h4>Properties</h4></Nav.Link>
                    </Nav>
                    <Nav>  
                        <Nav.Link className="green-text" href="#login"><h4>Logout</h4></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    } else {
        return(
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
                        <Nav.Link className="green-text" href="/"><h4>Properties</h4></Nav.Link>
                    </Nav>
                    <Nav>  
                        <Nav.Link className="green-text" href="#login"><h4>Login</h4></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>    
        )
    }
}