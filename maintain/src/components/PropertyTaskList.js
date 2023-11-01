import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';

export const PropertyTaskList = () => {

    const navigate = useNavigate();
    const taskList = () => navigate('/taskList');
    const applianceList = () => navigate('/applianceList');

    return (
        <Container className="w-75 text-center" style={{backgroundColor: "#F8F9FA", height: 800}} >
            <h1 style={{color: "#2A4D6A"}}>1 First St.</h1>
            <h2 className="mb-5" style={{color: "#2A4D6A"}}>St. John's, NL</h2>
            <Row className="justify-content-md-center">
                <Col md={{ span: 4, offset: 0}}>
                    <Button type="submit" className="my-2" onClick={taskList} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A", width: "18rem", height: "3rem"}} disabled>
                        View Tasks
                    </Button>
                </Col>
                <Col md={{ span: 4, offset: 0 }}>
                    <Button type="submit" className="my-2" onClick={applianceList} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A", width: "18rem", height: "3rem"}} >
                        View Appliances
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Form className="my-3 w-50" style={{border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                    <h1 className='mb-3' style={{color: "#2A4D6A"}}>Outstanding Tasks</h1>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            Fall is here! Time to declutter the gutters.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            It's been one year already! Time to clean the dryer vent again.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            Vacuum time! Those pesky carpets are always dirty.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Row>
            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 justify-content-left" style={{border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                    <h1 className='mb-3' style={{color: "#2A4D6A"}}>Upcoming Tasks</h1>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            Winter is coming! Time to bring in the patio furniture.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            Safety first! Check fire alarms and fire extinguishers.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Text inline>
                            They help us stay clean but get dirty in the process. Time to scrub the tub.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Row>
            
        </Container>
    )
;}