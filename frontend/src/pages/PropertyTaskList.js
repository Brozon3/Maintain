import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
// import { useNavigate, useParams } from "react-router";
import { SwitchModal } from "../components/SwitchModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const PropertyTaskList = () => {

    const { id } = useParams(); // grabbing this ID

    const today = new Date();
    const [property, setProperty] = useState([]);
    const [tasks, setTasks] = useState([]);

    //Replace this with an API call for getting all property data based on Property ID


    //Return a task object, which than can pull various items from it. 
    //Postman use for getting. 
    useEffect ((id) => {
        const fetchProperty = async () => {
            const propertyResult = await fetch(`/properties/${id}`);
            const propertyJSONResult = await propertyResult.json();
            setProperty(propertyJSONResult);
            console.log("propertyResult: ", propertyResult)
        }
        fetchProperty();
        const fetchTask = async () => {
            const taskResult = await axios.get(`/propertyTasks/${id}`);
            const taskJSONResult = await taskResult.json();
            setTasks(taskJSONResult);
            console.log("TaskResults: ", taskResult)
        }
        fetchTask();
    }, [property, tasks])

    const navigate = useNavigate();
    const addTask = () => navigate('/addTask/' + id);

    return (
        <Container className="text-center main" >

            <h1 className="p-3 blue-header">{property.address}</h1>
            <h2 className="mb-2 blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

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