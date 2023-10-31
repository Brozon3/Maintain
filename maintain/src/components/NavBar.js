import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export const NavBar = () => {
    
    return(
    <Navbar className="bg-body-tertiary border border-success">
        <Container>
            <Navbar.Brand href="/">
                <img
                    src={require("../MaintainLogo.png")}
                    width="150"
                    height="95"
                    className="d-inline-block align-top"
                    alt="Maintain logo"
                />
            </Navbar.Brand>
            <Nav>  
                <Nav.Link href="#login" style={{color:'#17A589'}}><h4>Logout</h4></Nav.Link>
            </Nav>
        </Container>
    </Navbar>    
    )
}

export default NavBar;