import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const maxProperties = 3;

export function DisplayProperties({properties}){
    
    const navigate = useNavigate();
    const addProperty = () => navigate('/addProperty');
    const viewProperty = (id) => navigate('/taskList/' + id);
    
    return(
        <Container className="container w-75 main">
            <Row xs={1} md={2} className="g-4">
                {properties.map(property => {
                    return(
                        <Col key={property.id}>
                            <Card className="m-5 text-center blue-border">
                                <Card.Body className="align-items-center">
                                    <Card.Title className="blue-header">{property.address}</Card.Title>
                                    <Card.Text className="blue-header">
                                        {(property.city) + ", " + (property.province)}
                                    </Card.Text>
                                    <Button type="submit" className="mx-2 green-button" onClick={() => viewProperty(property.id)}>
                                        View Property
                                    </Button>
                                    <Button type="submit" className="mx-2 green-button">
                                        Delete Property
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
                <Col>
                    <Card className="m-5 text-center green-border">
                        <Card.Body className="align-items-center">
                            <Card.Title className="blue-header">{(maxProperties - properties.length) + " Properties Remaining"}</Card.Title>
                            <Button type="submit" className="mx-2 green-button" onClick={addProperty} >
                                Add a Property
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}