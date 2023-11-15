import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export const SwitchModal = ({task, tasks, setTasks, i, color}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        document.querySelectorAll('input[type=checkbox]').forEach(element => element.checked = false);
    };

    const handleOpen = () => setShow(true);

    const deleteTask = (task, tasks) => { 
        setTasks(()=> {
            const updatedTasks = [];
            for (let i=0; i<tasks.length; i++){
                if (tasks[i].taskName !== task.taskName){
                    updatedTasks.push(tasks[i]);
                }
            }
            return updatedTasks;
        });
    };

    const nextDate = (task, tasks) => {
        const completedDate = new Date();
        task.completedOn = completedDate.toDateString();

        let nextCompleteDate = new Date(completedDate);
        
        
        if (task.frequency === "Annually"){
            nextCompleteDate.setFullYear(nextCompleteDate.getFullYear() + 1);
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

        } else if (task.frequency === "Bi-Annually"){
            nextCompleteDate.setFullYear(nextCompleteDate.getFullYear() + 2);
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

        } else if (task.frequency === "Weekly"){
            nextCompleteDate.setDate(nextCompleteDate.getDate() + 7);
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

        } else if (task.frequency === "Bi-Weekly"){
            nextCompleteDate.setDate(nextCompleteDate.getDate() + 14);
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

        } else if (task.frequency === "Monthly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 1);
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

        } else if (task.frequency === "Bi-Monthly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 2);
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

        } else if (task.frequency === "Quarterly"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 3);
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

        } else if (task.frequency === "Semi-Annually"){
            nextCompleteDate.setMonth(nextCompleteDate.getMonth() + 6);
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

        } else {
            deleteTask(task, tasks);
        }

        handleClose();
        
    }

    const calculateDaysDue = (task) => {
        const today = new Date();
        const completeBy = new Date(task.completeBy)
        let datediff = completeBy.getTime() - today.getTime();
        datediff = Math.ceil(datediff / 1000 / 60 / 60 / 24);
        if (datediff === 0){
            return "Due Today"
        } else if (datediff === 1){
            return datediff.toString() + " Day Remaining"
        } else if (datediff === -1){
            return Math.abs(datediff.toString()) + " Day Overdue"
        } else if (datediff < -1) {
            return Math.abs(datediff.toString()) + " Days Overdue"
        } else {
            return datediff.toString() + " Days Remaining"
        }
    }
    
    if (color === "red"){
        return(
            <>
                <Row>
                    <Col lg={1}>
                        <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} id={"switch" + i}/>
                    </Col>
                    <Col lg={8}>
                        <p style={{textAlign: "left"}}>
                            {task.taskName}
                        </p>
                    </Col>
                    <Col lg={3}>
                        <Form.Text className="text-right red-text">{calculateDaysDue(task)}</Form.Text>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="blue-text">Complete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                    <Modal.Footer>
                    <Button className="blue-button"  onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={() => nextDate(task, tasks)}>
                        Complete Task
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    } else {
        return(
            <>
                <Row>
                    <Col lg={1}>
                        <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} id={"switch" + i}/>
                    </Col>
                    <Col lg={8}>
                        <p style={{textAlign: "left"}}>
                            {task.taskName}
                        </p>
                    </Col>
                    <Col lg={3}>
                        <Form.Text className="text-right blue-text">{calculateDaysDue(task)}</Form.Text>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="blue-text">Complete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                    <Modal.Footer>
                    <Button className="blue-button"  onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={() => nextDate(task, tasks)}>
                        Complete Task
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}