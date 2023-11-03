import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Footer = () => {
    return(
        <Navbar className="bg-body-tertiary fixed-bottom border border-success">
            <Container>
                <Navbar.Brand className='green-text'>
                    <h6>Copyright 2023</h6>
                </Navbar.Brand>
            </Container>
        </Navbar>    
    )
}