import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export const NavBar = () => {
    
    return(
    <Navbar bg="dark" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={require("../MaintainLogo.png")}
                    width="150"
                    height="95"
                    className="d-inline-block align-top"
                    alt="Maintain logo"
                />
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home" style={{color:'#17A589'}}>Home</Nav.Link>
                <Nav.Link href="properties" style={{color:'#17A589'}}>Properties</Nav.Link>
            </Nav>
        </Container>
    </Navbar>    
    )
}

export default NavBar;