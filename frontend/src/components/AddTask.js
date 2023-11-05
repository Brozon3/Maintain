import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AddTask = () => {

  return (
    <Container className="container w-75 main" >
        <h1 className='mb-3 blue-header'>Add a Task</h1>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label className='blue-text'>Task Name: </Form.Label>
                <Form.Control type="task-name" placeholder="Clean the cat litter" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className='blue-text'>Frequency: </Form.Label>
                <Form.Select>
                    <option value={"Weekly"}>Weekly</option>
                    <option value={"Bi-Weekly"}>Bi-Weekly</option>
                    <option value={"Monthly"}>Monthly</option>
                    <option value={"Bi-Monthly"}>Bi-Monthly</option>
                    <option value={"Quarterly"}>Quarterly</option>
                    <option value={"Semi-Annually"}>Semi-Annually</option>
                    <option value={"Annually"}>Annually</option>
                    <option value={"Bi-Annually"}>Bi-Annually</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label className='blue-text'>
                            Add task to all properties
                        </Form.Check.Label>
                    </Form.Group>

            <Button type="submit" className='green-button'>
                Submit
            </Button>
        
        </Form>
    </Container>
  )
}