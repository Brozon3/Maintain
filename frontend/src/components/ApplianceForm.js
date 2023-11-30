import axios from "axios";
import React from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import { UseUser } from "../auth/useUser";

export const ApplianceForm = ({ type }) => {    

    const user = UseUser();

    const { propertyID } = useParams();

    const [message, setMessage] = useState("");
    const [addedOrExists, setAddedOrExists] = useState("");
    
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="my-3 table-input">
                    <Col lg={1}>
                    <Form.Select onChange={(e)=>setOptions(e.target.value)} name="applianceType" className="table-input" {...register("applianceType", { required: true })}>
                        <option >--</option>
                        {
                            values.map((opts,i)=><option>{opts.applianceType}</option>)
                        }
                    </Form.Select>
                    {/*     <Form.Text name="applianceType" defaultValue={type} {...register("applianceType")}>
                            {type}
                        </Form.Text> */}
                    </Col>
                    <Col lg={2}>
                        <Form.Select name="brand" className="table-input" {...register("brand", { required: true })}>
                            <option >--</option>
                            <option value={"Amana"}>Amana</option>
                            <option value={"Bosch"}>Bosch</option>
                            <option value={"Electrolux"}>Electrolux</option>
                            <option value={"Frigidaire"}>Frigidaire</option>
                            <option value={"GE"}>GE</option>
                            <option value={"Hotpoint"}>Hotpoint</option>
                            <option value={"Kenmore"}>Kenmore</option>
                            <option value={"KitchenAid"}>KitchenAid</option>
                            <option value={"LG"}>LG</option>
                            <option value={"Maytag"}>Maytag</option>
                            <option value={"Miele"}>Miele</option>
                            <option value={"Panasonic"}>Panasonic</option>
                            <option value={"Speed Queen"}>Speed Queen</option>
                            <option value={"Whirlpool"}>Whirlpool</option>
                        </Form.Select>
                    </Col>
                    <Col lg={2}>
                        <Form.Control type="text" placeholder="0123456789" name="model" className="table-input" {...register("model", { required: true })}/>
                    </Col>
                    <Col lg={2}>
                        <Form.Control type="text" placeholder="ABCXYZ" name="serialNumber" className="table-input" {...register("serialNumber", { required: true })}/>
                    </Col>
                    <Col lg={2}>
                        <Form.Control type="date" className="table-input" name="purchaseDate" {...register("purhcaseDate", { required: true })}/>
                    </Col>
                    <Col lg={1}>
                        <Form.Control type="number" className="table-input" placeholder="1" min={0} max={25} defaultValue={0} name="warrantyLength" {...register("warrantyLength", { required: true })}/>
                    </Col>
                    <Col lg={1}>
                        {"N/A"}
                    </Col>
                    <Col lg={1}><Button className="green-button" type="submit">+</Button></Col>
                </Row>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="blue-text">
                    Appliance {addedOrExists}{" "}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="blue-text">{message}</Modal.Body>
                <Modal.Footer>
                <Button className="green-button" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}