import React, {useState, useEffect }from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "../components/ApplianceForm";
import axios from "axios"

export const PropertyApplianceList = () => {

    const { propertyID } = useParams();

    const [property, setProperty] = useState({});
    const [appliances, setAppliances] = useState([]);
    const [applianceTypes, setApplianceTypes] = useState([]);

    const getApplianceTypes = async () => {
        const result = await axios.get("/api/applianceTypes");
        setApplianceTypes(result.data.applianceTypes);
    }

    useEffect(() => {
        getApplianceTypes();
    }, [])

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
        setAppliances(result.data.getAppliances);
        console.log(appliances);
    }
    
    useEffect (() => {
        fetchAppliances();
    }, []);

    const warrantyCheck = (purchaseDate, warrantyLength) => {
        if (purchaseDate === ""){
            return "--";
        }

        const today = new Date();
        const pDate = new Date(purchaseDate);

        const warrantyExpireDate = new Date(pDate);
        warrantyExpireDate.setFullYear(warrantyExpireDate.getFullYear() + warrantyLength);
        
        if (today < warrantyExpireDate) {
            return "No";
        } else {
            return "Yes";
        }
    };

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
                {applianceTypes.map((type, i) => {
                    return(
                        <>
                            {appliances.filter((appliance) => appliance.applianceType === type).map((appliance, i) => {
                                return(
                                    <Row className="my-3 table-input" key={appliance.serialNumber + i}>
                                        <Col lg={1}>{appliance.applianceType}</Col>
                                        <Col lg={2}>{appliance.manufacturer}</Col>
                                        <Col lg={2}>{appliance.model}</Col>
                                        <Col lg={2}>{appliance.serialNumber}</Col>
                                        <Col lg={2}>{appliance.purchaseDate.substring(0, 10)}</Col>
                                        <Col lg={1}>{appliance.warrantyLength}</Col>
                                        <Col lg={1}>{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</Col>
                                        <Col lg={1}><Button className="blue-button">-</Button></Col>
                                    </Row>
                                )   
                            })}
                        </>
                    )
                })}
                <ApplianceForm type={"washer"}/>                

            </Container>
         
        </Container>
    )
}