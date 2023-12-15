import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

export const SwitchModal = ({task, i, color, fetchTasks}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        document.querySelectorAll('input[type=checkbox]').forEach(element => element.checked = false);
    };

    const handleOpen = () => setShow(true);

    const saveTask = async (entryID) => {
        const response = await axios.post("/api/updateTask", {
            entryID: entryID
        });
        fetchTasks();
        handleClose();
    };

    const calculateDaysDue = (task) => {
        const today = new Date();
        const completeBy = new Date(task[1])
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
                <tr>
                    <td>
                        <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} id={"switch" + i}/>
                    </td>
                    <td>
                        {task[0]}
                    </td>
                    <td className="text-right red-text">
                        {calculateDaysDue(task)}
                    </td>
                </tr>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="blue-text">Complete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                    <Modal.Footer>
                    <Button className="blue-button"  onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={() => saveTask(task[2])}>
                        Complete Task
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    } else {
        return(
            <tr>
                <td>
                    <Form.Check type={"switch"} onClick={handleOpen} defaultChecked={false} id={"switch" + i}/>
                </td>
                <td style={{textAlign: "left"}}>
                    {task[0]}
                </td>
                <td className="text-right blue-text">
                    {calculateDaysDue(task)}
                </td>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="blue-text">Complete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="blue-text">Are you sure you want to complete this task?</Modal.Body>
                    <Modal.Footer>
                        <Button className="blue-button"  onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button className="green-button" onClick={() => saveTask(task[2])}>
                            Complete Task
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        )
    }
}