import React, {useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "../components/ApplianceForm";
import { ApplianceField } from "../components/ApplianceField";
import axios from "axios"

export const PropertyApplianceList = () => {

    const { propertyID } = useParams();

    const [property, setProperty] = useState({});
    const [appliances, setAppliances] = useState([]);

    const fetchProperty = async () => {
        const result = await axios.get(`/api/properties/${propertyID}`)
        if (result.data) {
            setProperty(result.data);
        } else {
            setProperty([]);
        }
    };

    useEffect (() => {
        fetchProperty();
    }, []);

    const fetchAppliances = async () => {
        const result = await axios.get(`/api/propertyAppliances/${propertyID}`)
        console.log(result.data.getAppliances);
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
        <Container className="text-center main">

            <h1 className="p-3 mb-3 blue-header">{property.address}</h1>
            <h2 className="blue-secondary-header">{(property.city) + ", " + (property.prov)}</h2>

            <PropertyDoubleButton current={"appliance"} propertyID={propertyID}/>

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
                        <h6>#</h6>
                    </Col>
                </Row>
                
                {appliances.map((appliance, i) => {
                    return(
                        <ApplianceField appliance={appliance} i={i} fetchAppliances={fetchAppliances} />
                    )   
                })}
   
                <ApplianceForm fetchAppliances={fetchAppliances} />                

            </Container>
         
        </Container>

    )
}