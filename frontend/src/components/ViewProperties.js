import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DisplayProperties(){
    
    const navigate = useNavigate();
    const addProperty = () => navigate('/addProperty');
    const viewProperty = () => navigate('/taskList');
    
    return(
        <Container className="container w-75 main">
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card className="m-5 text-center blue-border">
                        <Card.Body className="align-items-center">
                            <Card.Title className="blue-header">1 First St.</Card.Title>
                            <Card.Text className="blue-header">
                                St. John's, NL
                            </Card.Text>
                            <Button type="submit" className="mx-2 green-button" onClick={viewProperty}>
                                View Property
                            </Button>
                            <Button type="submit" className="mx-2 green-button">
                                Delete Property
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-5 text-center blue-border">
                        <Card.Body>
                            <Card.Title className="blue-header">21 Jump St.</Card.Title>
                            <Card.Text className="blue-header">
                                Torbay, NL
                            </Card.Text>
                            <Button type="submit" className="mx-2 green-button">
                                View Property
                            </Button>
                            <Button type="submit" className="mx-2 green-button">
                                Delete Property
                            </Button>
                        </Card.Body>
                    </Card>               
                </Col>
                <Col>
                    <Card className="m-5 text-center green-border">
                        <Card.Body>
                            <Card.Title className="blue-header">2 Properties Available</Card.Title>
                            <Button type="submit" className="green-button" onClick={addProperty}>
                                Add a property
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}