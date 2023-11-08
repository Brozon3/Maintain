import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const SwitchModal = ({task, tasks, setTasks, i}) => {

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
    
    return(
        <React.Fragment>
            <Form.Group className="mb-3">
                <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} id={"switch" + i} inline/>
                <Form.Check.Label htmlFor={"switch" + i}>
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
                <Button className="green-button" onClick={() => nextDate(task, tasks)}>
                    Complete Task
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}