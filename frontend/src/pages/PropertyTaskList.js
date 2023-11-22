import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { SwitchModal } from "../components/SwitchModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PropertyTaskList = () => {

    const { id } = useParams(); // grabbing this ID

    const today = new Date();

    const [property, setProperty] = useState([]);
    const [tasks, setTasks] = useState([]);

    // Get Property by ID to display current property
    // 
    // Get Tasks associated with property ID from propertyTask table
    // Return the tasks from the database to the front end 
    // render the tasks
    // 

    const fetchProperty = async () => {
        const result = await axios.get(`/api/properties/${id}`)
        console.log(result);
        if (result.data) {
            setProperty(result.data);
        } else {
            setProperty([]);
        }
    };

    useEffect (() => {
        fetchProperty();
    }, []);

    const fetchTasks = async () => {
        const result = await axios.get(`/api/propertyTasks/${id}`)
        if (result.data.taskIDs) {
            setTasks(result.data.taskIDs);
        } else {
            setTasks([]);
        }
    }
    
    useEffect (() => {
        fetchTasks();
    }, []);

    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + id);
    return (
        <Container className="text-center main" >

            <h1 className="p-3 mb-3 blue-header">{property.address}</h1>
            <h2 className="blue-secondary-header">{(property.city) + ", " + (property.prov)}</h2>

            <PropertyDoubleButton current={"task"} id={id}/>
                <Form className="container w-75 blue-border my-3">
                    <h1 className='mb-3 blue-header p-3'>Outstanding Tasks</h1>
                    {tasks.map((task, i) => {
                        if (new Date(task.completeBy) <= today){
                            return(
                                <SwitchModal task={task} tasks={tasks} setTasks={setTasks} key={"out" + i} i={i} color={"red"}/>
                            )
                        } else {
                            return(null);
                        }
                    })}
                </Form>
                <Form className="container w-75 justify-content-center blue-border my-3">
                    <h1 className='mb-3 blue-header p-3'>Upcoming Tasks</h1>
                    {tasks.map((task, i) => {
                        if (new Date(task.completeBy) > today){
                            return(
                                <SwitchModal task={task} tasks={tasks} setTasks={setTasks} key={"up" + i} i={i}/>
                            )
                        } else {
                            return(null);
                        }
                    })}
                </Form>
                <Button className="my-3 green-button non-card-button" type="submit" onClick={addTask}>
                    Add Custom Task 
                </Button>
        </Container>
    )
}