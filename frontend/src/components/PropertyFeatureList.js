import React, {useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios"


export const PropertyFeatureList = () => {

    const { propertyID } = useParams();

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const result = await axios.get(`/api/propertyFeatures/${propertyID}`)
            if (result.data.getFeatures) {
                setFeatures(result.data.getFeatures);
            } else {
                setFeatures([]);
            }
    
        }
        fetchFeatures();
        console.log(features);
    }, [features.length])

    return(
        <>
            <Form className="container w-75 blue-border my-3">
                <Row className="my-3">
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="blue-text" htmlFor="carpet">
                                Carpet:{" "}
                            </Form.Label>
                            <Form.Select id="carpet">
                                <option value={"--"}>--</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="blue-text" htmlFor="heating">
                                Heating Type:{" "}
                            </Form.Label>
                            <Form.Select id="heating">
                                <option value={"--"}>--</option>
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
                            <Form.Select id="roof">
                                <option value={"--"}>--</option>
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
                            <Form.Select id="exterior">
                                <option value={"--"}>--</option>
                                <option value={"Vinyl"}>Vinyl</option>
                                <option value={"Aluminum"}>Aluminum</option>
                                <option value={"Paint"}>Paint</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                
            </Form>
            <Button type="submit" className="green-button mx-3">
                Save
            </Button>
        </>
    )
}