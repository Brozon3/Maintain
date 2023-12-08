import axios from "axios";
import React from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import { UseUser } from "../auth/useUser";
import { ApplianceTypeSelect } from "../components/ApplianceTypeSelect";

export const ApplianceForm = ({ fetchAppliances }) => {    

    const user = UseUser();

    const { propertyID } = useParams();
    
    const { register, handleSubmit, reset } = useForm();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const onSubmit = async (data) => {
        const response = await axios.post("/api/addAppliance", {
            user: user,
            propertyID: propertyID,
            data: data
        })
        handleClose();
        reset();
    }

    return (
        <>
            <Container className="container main">
                <h1 className="mb-3 p-3 blue-header">Add an Appliance</h1>
                <Form
                className="container w-50 justify-content-center"
                >
                
                <ApplianceTypeSelect type={"no_label"} register={register}/>

                <Form.Group className="mb-3">
                    <Form.Label className="blue-text" htmlFor="manufacturer">
                        Manufacturer:{" "}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Maintain"
                        id="manufacturer"
                        {...register("manufacturer", { required: true })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="blue-text" htmlFor="model">
                        Model:{" "}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ABC123"
                        id="model"
                        {...register("model", { required: true })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="blue-text" htmlFor="serialNumber">
                        Serial Number:{" "}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123456"
                        id="serialNumber"
                        {...register("serialNumber", { required: true })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="blue-text" htmlFor="purchaseDate">
                        Purchase Date:{" "}
                    </Form.Label>
                    <Form.Control
                        type="date"
                        id="purchaseDate"
                        {...register("purchaseDate", { required: true })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="blue-text" htmlFor="warrantyLength">
                        Warranty Length:{" "}
                    </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="1"
                        min={0}
                        max={25}
                        id="warrantyLength"
                        {...register("warrantyLength", { required: true })}
                    />
                </Form.Group>


                <Button className="green-button" onClick={handleOpen}>
                    Add Appliance
                </Button>

                </Form>

            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="blue-text">
                        Add Appliance
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="blue-text">
                    Are you sure you want to add this appliance?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="blue-button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={handleSubmit}>
                        Add Appliance
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}