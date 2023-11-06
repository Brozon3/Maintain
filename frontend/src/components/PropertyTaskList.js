import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { PropertyDoubleButton } from "./PropertyDoubleButton";
import { useNavigate, useParams } from "react-router";

export const PropertyTaskList = ({properties}) => {

    const { id } = useParams();
    

    const findProperty = () => {
        for (let i=0; i < properties.length; i++){
            if (properties[i].id === parseInt(id)){
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
                    {property.outstandingTasks.map((task, i) => {
                        return(
                            <Form.Group className="mb-3" key={i}>
                                <Form.Check type={"switch"} inline/>
                                <Form.Check.Label>
                                    {task}
                                </Form.Check.Label>
                            </Form.Group>
                        )
                    })}
                    
                </Form>
            </Row>

            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 justify-content-left blue-border" style={{textAlign: "left"}}>

                    <h1 className='mb-3 blue-header'>Upcoming Tasks</h1>
                    {property.upcomingTasks.map((task, i) => {
                        return(
                            <Form.Group className="mb-3" key={i}>
                                <Form.Check type={"switch"} inline/>
                                <Form.Check.Label>
                                    {task}
                                </Form.Check.Label>
                            </Form.Group>
                        )
                    })}

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