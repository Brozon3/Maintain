import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const Footer = () => {
    return(
        <Navbar className="bg-body-tertiary fixed-bottom border border-success">
            <Container>
                <Navbar.Brand href="/" style={{color:'#17A589'}}>
                    <h6>Copyright 2023</h6>
                </Navbar.Brand>
            </Container>
        </Navbar>    
    )
}