import React, {useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal, Container } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios"
import { useForm } from "react-hook-form";
import { UseUser } from "../auth/useUser";

export const PropertyFeatureList = () => {

    const { propertyID } = useParams();
    const [carpet, setCarpet] = useState(null);
    const [heating, setHeating] = useState(null);
    const [exterior, setExterior] = useState(null);
    const [roof, setRoof] = useState(null);
    const [show, setShow] = useState(false);
    const user = UseUser();

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {

        const fetchFeatures = async () => {
            const result = await axios.get(`/api/propertyFeatures/${propertyID}`);
            let features = result.data.getFeatures;
            features = features.map(feature => feature.featureID);
            console.log(features);

            if (features.includes(416)){
                setCarpet("carpet");
            } else {
                setCarpet(null);
            }

            if (features.includes(417)){
                setRoof("roof_metal");
            } else if (features.includes(418)){
                setRoof("roof_shingles")
            } else {
                setRoof(null);
            }

            if (features.includes(419)){
                setHeating("heating_electric");
            } else if (features.includes(420)){
                setHeating("heating_oil")
            } else {
                setHeating(null);
            }

            if (features.includes(421)){
                setExterior("exterior_vinyl");
            } else if (features.includes(422)){
                setExterior("exterior_aluminum")
            } else if (features.includes(423)){
                setExterior("exterior_paint")
            } else {
                setHeating(null);
            }
            
        }
        fetchFeatures();
    }, [])
    
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const response = await axios.post("/api/updateFeatures", {
            userID: user.userID,
            propertyID: propertyID,
            features: data
        })
        handleClose();
        reset();
      };

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container className="container w-75 blue-border my-3">
                <Row className="my-3">
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="blue-text" htmlFor="carpet">
                                Carpet:{" "}
                            </Form.Label>
                            <Form.Select id="carpet" name="carpet" defaultValue={carpet} {...register("carpet")}>
                                <option value={carpet}>{carpet}</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="blue-text" name="heating" htmlFor="heating">
                                Heating Type:{" "}
                            </Form.Label>
                            <Form.Select id="heating" defaultValue={heating} {...register("heating")}>
                                <option value={heating}>{heating}</option>
                                <option value={"Electric"}>Electric</option>
                                <option value={"Oil"}>Oil</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="blue-text" htmlFor="roof">
                                Roof Type:{" "}
                            </Form.Label>
                            <Form.Select id="roof" defaultValue={roof} name="roof" {...register("roof")}>
                                <option value={roof}>{roof}</option>
                                <option value={"Shingles"}>Shingles</option>
                                <option value={"Metal"}>Metal</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group>
                            <Form.Label className="blue-text" htmlFor="exterior">
                                Exterior Type:{" "}
                            </Form.Label>
                            <Form.Select id="exterior" defaultValue={exterior} name="exterior" {...register("exterior")}>
                                <option value={exterior}>{exterior}</option>
                                <option value={"Vinyl"}>Vinyl</option>
                                <option value={"Aluminum"}>Aluminum</option>
                                <option value={"Paint"}>Paint</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Button className="green-button mx-3" onClick={handleOpen} type="button">
                Save
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="blue-text">Save Features</Modal.Title>
                </Modal.Header>
                <Modal.Body className="blue-text">
                    Are you sure you want to save these features?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="blue-button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" type="submit">
                        Save Features
                    </Button>
                </Modal.Footer>
            </Modal>  
        </Form>
    )
}