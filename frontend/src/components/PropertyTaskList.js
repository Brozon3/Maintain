import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { SwitchModal } from "./TaskField";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PropertyTaskList = () => {

    const { propertyID } = useParams();

    const today = new Date();

    const [tasks, setTasks] = useState([]);
    const [showCongratsMessage, setShowCongratsMessage] = useState(true);
    
    const fetchTasks = async () => {
        const result = await axios.get(`/api/propertyTasks/${propertyID}`);
        if (result.data.tasks){
            setTasks(result.data.tasks);
        } else {
            setTasks([]);
        }
        
    }
    
    useEffect (() => {
        fetchTasks();
    }, [tasks.length]);
    
    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + propertyID);

    return (
        <>
            <Table responsive className="blue-border">
                <thead>
                    <tr>
                        <th className='mb-3 blue-header p-3'>Outstanding Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tasks.map((task, i) => {
                            if (new Date(task[1]) <= today){
                                setShowCongratsMessage(false);
                                return(
                                    <SwitchModal task={task} fetchTasks={() => fetchTasks()} key={"out" + i} i={i} color={"red"}/>
                                )
                            } else {
                                return (null);
                            }
                        })}
                    </tr>
                    <tr>
                        {showCongratsMessage && <h1 className="green-secondary-header mb-3">{"Congratulations on keeping your property maintained!"}</h1>}
                    </tr>
                </tbody>
            </Table>
            <Table responsive className="blue-border">
                <thead>
                    <tr>
                        <th></th>
                        <th className='mb-3 blue-header p-3'>Upcoming Tasks</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => {
                        if (new Date(task[1]) > today){
                            return(
                                <SwitchModal task={task} fetchTasks={() => fetchTasks()} key={"up" + i} i={i}/>
                            )
                        } else {
                            return(null);
                        }
                    })}
                </tbody>
            </Table>
        
            <Button className="my-3 green-button" type="submit" onClick={addTask}>
                Add Custom Task 
            </Button>
        </>
    )
}