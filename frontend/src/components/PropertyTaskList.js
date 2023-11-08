import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Modal } from "react-bootstrap";
import { PropertyDoubleButton } from "./PropertyDoubleButton";
import { useNavigate, useParams } from "react-router";

export const PropertyTaskList = ({properties}) => {

    const { id } = useParams();

    const today = new Date();
    
    const findProperty = () => {
        for (let i=0; i < properties.length; i++){
            if (properties[i].id === parseInt(id)){
                return properties[i];
            }
        }
    }

    const property = findProperty();

    const [tasks, setTasks] = useState(property.tasks);

    useEffect (() => {
        document.querySelectorAll('input[type=checkbox]').forEach(element => element.checked = false);
    }, [tasks])

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        document.querySelectorAll('input[type=checkbox]').forEach(element => element.checked = false);
    };
    const handleOpen = () => setShow(true);

    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + id);

    const nextDate = (task, tasks) => {
        const completedDate = new Date();
        task.completedOn = completedDate.toDateString();
        console.log(task.completedOn);

        let nextCompleteDate = new Date(completedDate);
        
        
        if (task.frequency === "Annually"){
            nextCompleteDate.setFullYear(nextCompleteDate.getFullYear() + 1);
        } else if (task.frequency === "Bi-Annually"){
            nextCompleteDate.setFullYear(nextCompleteDate.getFullYear() + 2);
        } else if (task.frequency === "Weekly"){
            nextCompleteDate.setDate(nextCompleteDate.getDate() + 7);
        } else if (task.frequency === "Bi-Weekly"){
            nextCompleteDate.setDate(nextCompleteDate.getDate() + 14);
        } else if (task.frequency === "Monthly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 1);
        } else if (task.frequency === "Bi-Monthly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 2);
        } else if (task.frequency === "Quarterly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 3);
        } else if (task.frequency === "Semi-Annually"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 6);
        } else {
            nextCompleteDate = "";
        }
        
        task.completeBy = nextCompleteDate.toDateString();

        setTasks(()=> {
            const updatedTasks = [];
            for (let i=0; i<tasks.length; i++){
                if (tasks[i].taskName !== task.taskName){
                    updatedTasks.push(tasks[i]);
                }
            }
            updatedTasks.push(task);
            return updatedTasks;
        });
        
    }

    return (
        <Container className="text-center main" >

            <h1 className="blue-header">{property.address}</h1>
            <h2 className="mb-2 blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

            <PropertyDoubleButton current={"task"} id={id}/>
            
            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 blue-border" style={{textAlign: "left"}}>

                    <h1 className='mb-3 blue-header'>Outstanding Tasks</h1>
                    {tasks.map((task, i) => {
                        if (new Date(task.completeBy) <= today){
                            return(
                                <>
                                <Form.Group className="mb-3" key={i}>
                                    <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} inline/>
                                    <Form.Check.Label>
                                        {task.taskName}
                                    </Form.Check.Label>
                                </Form.Group>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="blue-text">Complete Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                                    <Modal.Footer>
                                    <Button className="blue-button"  onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button className="green-button" onClick={() => { nextDate(task, tasks); handleClose()}}>
                                        Complete Task
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                                </>
                            
                            )
                        } else {
                            return("")
                        }
                    })}
                    
                </Form>
            </Row>

            <Row className="justify-content-md-center">
                <Form className="my-3 w-50 justify-content-left blue-border" style={{textAlign: "left"}}>

                    <h1 className='mb-3 blue-header'>Upcoming Tasks</h1>
                    {tasks.map((task, i) => {
                        if (new Date(task.completeBy) > today){
                            return(
                                <>
                                    <Form.Group className="mb-3" key={i}>
                                        <Form.Check type={"switch"} onClick={handleOpen} inline/>
                                        <Form.Check.Label>
                                            {task.taskName}
                                        </Form.Check.Label>
                                    </Form.Group>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title className="blue-text">Complete Task</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                                        <Modal.Footer>
                                        <Button className="blue-button"  onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button className="green-button" onClick={() => { nextDate(task, tasks); handleClose()}}>
                                            Complete Task
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )
                        } else {
                            return("")
                        }
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