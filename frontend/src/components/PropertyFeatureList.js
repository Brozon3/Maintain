import React, {useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios"


export const PropertyFeatureList = () => {

    const { propertyID } = useParams();
    const [carpet, setCarpet] = useState(null);
    const [heating, setHeating] = useState(null);
    const [exterior, setExterior] = useState(null);
    const [roof, setRoof] = useState(null);

    useEffect(() => {

        const fetchFeatures = async () => {
            const result = await axios.get(`/api/propertyFeatures/${propertyID}`);
            let features = result.data.getFeatures;
            features = features.map(feature => feature.featureID);

            if (features.includes(376)){
                setCarpet("carpet");
            } else {
                setCarpet(null);
            }

            if (features.includes(377)){
                setRoof("roof_metal");
            } else if (features.includes(378)){
                setRoof("roof_shingles")
            } else {
                setRoof(null);
            }

            if (features.includes(379)){
                setHeating("heating_electric");
            } else if (features.includes(380)){
                setHeating("heating_oil")
            } else {
                setHeating(null);
            }

            if (features.includes(381)){
                setExterior("exterior_vinyl");
            } else if (features.includes(382)){
                setExterior("exterior_aluminum")
            } else if (features.includes(383)){
                setExterior("exterior_paint")
            } else {
                setHeating(null);
            }
            
        }
        fetchFeatures();
    }, [])

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
                                <option value={carpet}>{carpet}</option>
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
                            <Form.Select id="roof">
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
                            <Form.Select id="exterior">
                                <option value={exterior}>{exterior}</option>
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