import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { SwitchModal } from "./TaskField";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PropertyTaskList = () => {

    const { propertyID } = useParams();

    const today = new Date();

    const [tasks, setTasks] = useState([]);
    
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
    }, []);
    
    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + propertyID);

    return (
        <>
            <Form className="container w-75 blue-border my-3">
                <h1 className='mb-3 blue-header p-3'>Outstanding Tasks</h1>
                {tasks.map((task, i) => {
                    if (new Date(task[1]) <= today){
                        return(
                            <SwitchModal task={task} fetchTasks={() => fetchTasks()} key={"out" + i} i={i} color={"red"}/>
                        )
                    } else {
                        return (null);
                    }
                })}
            </Form>
            <Form className="container w-75 justify-content-center blue-border my-3">
                <h1 className='mb-3 blue-header p-3'>Upcoming Tasks</h1>
                {tasks.map((task, i) => {
                    if (new Date(task[1]) > today){
                        return(
                            <SwitchModal task={task} fetchTasks={() => fetchTasks()} key={"up" + i} i={i}/>
                        )
                    } else {
                        return(null);
                    }
                })}
            </Form>
            <Button className="my-3 green-button" type="submit" onClick={addTask}>
                Add Custom Task 
            </Button>
        </>
    )
}