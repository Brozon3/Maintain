import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DisplayProperties(){
    
    const navigate = useNavigate();
    const addProperty = () => navigate('/addProperty');
    const viewProperty = () => navigate('/viewProperty');
    
    return(
        <Container className="container w-75" style={{backgroundColor: "#F8F9FA", height: 800}} >
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <a>
                        <Card className="m-5 text-center" style={{width:"30rem", height:"15rem", border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                            <Card.Body>
                                <Card.Title>1 First St.</Card.Title>
                                <Card.Text>
                                    St. John's, NL
                                </Card.Text>
                                <Button type="submit" className="mx-2" onClick={viewProperty} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                                    View Property
                                </Button>
                                <Button type="submit" className="mx-2" style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                                    Delete Property
                                </Button>
                            </Card.Body>
                        </Card>
                    </a>
                </Col>
                <Col>
                    <a>
                        <Card className="m-5 text-center" style={{width:"30rem", height:"15rem", border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                            <Card.Body>
                                <Card.Title>21 Jump St.</Card.Title>
                                <Card.Text>
                                    Torbay, NL
                                </Card.Text>
                                <Button type="submit" className="mx-2" style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                                    View Property
                                </Button>
                                <Button type="submit" className="mx-2" style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                                    Delete Property
                                </Button>
                            </Card.Body>
                        </Card>
                    </a>                    
                </Col>
                <Col>
                <a>
                    <Card className="m-5 text-center" style={{width:"30rem", height:"15rem", border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                        <Card.Body>
                            <Card.Title>+</Card.Title>
                            <Button type="submit" onClick={addProperty} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A"}}>
                                Add a property
                            </Button>
                        </Card.Body>
                    </Card>
                </a>
                </Col>
                

            </Row>
        </Container>
    )
};

