import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { PropertyDoubleButton } from "./PropertyDoubleButton";
import { useNavigate, useParams } from "react-router";

export const PropertyTaskList = ({properties}) => {

    const { id } = useParams();
    

    const findProperty = () => {
        for (let i=0; i < properties.length; i++){
            if (properties[i].id == id){
                return properties[i];
            }
        }
    }

    const property = findProperty();

    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + id);

    return (
        <Container className="w-75 text-center main" >

            <h1 className="blue-header">{property.address}</h1>
            <h2 className="mb-2 blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

            <PropertyDoubleButton current={"task"} id={id}/>
            
            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 blue-border" style={{textAlign: "left"}}>

                    <h1 className='mb-3 blue-header'>Outstanding Tasks</h1>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            Fall is here! Time to declutter the gutters.
                        </Form.Check.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            It's been one year already! Time to clean the dryer vent again.
                        </Form.Check.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            Vacuum time! Those pesky carpets are always dirty.
                        </Form.Check.Label>
                    </Form.Group>

                </Form>
            </Row>

            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 justify-content-left blue-border" style={{textAlign: "left"}}>

                    <h1 className='mb-3 blue-header'>Upcoming Tasks</h1>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            Winter is coming! Time to bring in the patio furniture.
                        </Form.Check.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            Safety first! Check fire alarms and fire extinguishers.
                        </Form.Check.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check type={"switch"} inline/>
                        <Form.Check.Label>
                            They help us stay clean but get dirty in the process. Time to scrub the tub.
                        </Form.Check.Label>
                    </Form.Group>

                </Form>
                <Row className="justify-content-md-center">
                    <Button className="my-3 green-button non-card-button" type="submit" onClick={addTask}>
                        Add Custom Task 
                    </Button>
                </Row>
            </Row>
        </Container>
    )
}