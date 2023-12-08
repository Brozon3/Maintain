import React, {useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { ApplianceField } from "./ApplianceField";
import axios from "axios"
import { useNavigate } from "react-router";

export const PropertyApplianceList = () => {

    const { propertyID } = useParams();

    const [appliances, setAppliances] = useState([]);

    const navigate = useNavigate();
    const addAppliance = () => {
        console.log("Hello");
        navigate("/addAppliance/" + propertyID);
    }

    const fetchAppliances = async () => {
        const result = await axios.get(`/api/propertyAppliances/${propertyID}`)
        if (result.data.getAppliances) {
            setAppliances(result.data.getAppliances);
        } else {
            setAppliances([]);
        }
        
    }
    
    useEffect (() => {
        fetchAppliances();
    }, []);

    return (
        <>
            <Container className="blue-border my-3 blue-text">
                <Row className="my-3 table-input">
                    <Col lg={1}>
                        <h6>Type</h6>
                    </Col>
                    <Col lg={2}>    
                        <h6>Manufacturer</h6>
                    </Col>
                    <Col lg={2}>    
                        <h6>Model</h6>
                    </Col>
                    <Col lg={2}>    
                        <h6>Serial Number</h6>
                    </Col>
                    <Col lg={2}>    
                        <h6>Purchase Date</h6>
                    </Col>
                    <Col lg={1}>    
                        <h6>Warranty Length</h6>
                    </Col>
                    <Col lg={1}>    
                        <h6>Warranty Expired</h6>
                    </Col>
                    <Col lg={1}>    
                        
                    </Col>
                </Row>
                
                {appliances.map((appliance, i) => {
                    return(
                        <ApplianceField appliance={appliance} i={i} fetchAppliances={fetchAppliances} key={i}/>
                    )
                })}

            </Container>
            <Button type="submit" className="green-button mx-3" onClick={() => addAppliance()}>
                Add Appliance
            </Button>
        </>
    )
}