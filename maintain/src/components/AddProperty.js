import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AddProperty = () => {
  return (
    <Container className="container w-75" style={{backgroundColor: "#F8F9FA", height: 800}} >
        <h1 className='mb-3' style={{color: "#2A4D6A"}}>Add a Property</h1>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label style={{color: "#2A4D6A"}}>Property Address: </Form.Label>
                <Form.Control type="address" placeholder="20 Fake Pl." />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{color: "#2A4D6A"}}>Property City: </Form.Label>
                <Form.Control type="city" placeholder="Exampleville" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{color: "#2A4D6A"}}>Property State/Province: </Form.Label>
                <Form.Control type="stprov" placeholder="EX" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{color: "#2A4D6A"}}>Property Type: </Form.Label>
                <Form.Control type="type" placeholder="Condo"/>
            </Form.Group>

            <Button type="submit" style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                Submit
            </Button>
        </Form>
    </Container>
  );
}