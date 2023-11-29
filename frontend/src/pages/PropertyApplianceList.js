import React, {useState, useEffect }from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "../components/ApplianceForm";
import axios from "axios"

export const PropertyApplianceList = () => {

    const { id } = useParams();

    const [property, setProperty] = useState({});
    const [appliances, setAppliances] = useState([]);

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

    // TODO: create the route for getting all appliances by propertyID
    const fetchAppliances = async () => {
        const result = await axios.get(`/api/propertyAppliances/${id}`)
        if (result.data.getAppliances) {
            setAppliances(result.data.getAppliances);
        } else {
            setAppliances([]);
        }
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
    }

    return (
        <Container className="text-center main">

            <h1 className="p-3 mb-3 blue-header">{property.address}</h1>
            <h2 className="blue-secondary-header">{(property.city) + ", " + (property.prov)}</h2>

            <PropertyDoubleButton current={"appliance"} id={id}/>

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
                    // if (appliance.empty === false){
                    if (appliance){
                        return(
                            <Row className="my-3 table-input" key={i}>
                                <Col lg={1}>{appliance.applianceType}</Col>
                                <Col lg={2}>{appliance.manufacturer}</Col>
                                <Col lg={2}>{appliance.model}</Col>
                                <Col lg={2}>{appliance.serialNumber}</Col>
                                <Col lg={2}>{appliance.purchaseDate}</Col>
                                <Col lg={1}>{appliance.warrantyLength}</Col>
                                <Col lg={1}>{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</Col>
                                <Col lg={1}><a href="/" className="link">User Manual</a></Col>
                            </Row>
                        )
                    }
                     else {
                        return(
                            <ApplianceForm appliance={appliance} warrantyCheck={warrantyCheck} key={i}/>
                        )
                    
                    }
                })}
                {/* {appliances.map((appliance, i) => {
                    return (
                    <Row className="my-3 table-input" key={i}>
                        <ApplianceForm appliance={appliance} warrantyCheck={warrantyCheck} key={i}/>
                    </Row> 
                    )
                })} */}
                    <Row className="my-3 table-input">
                        <ApplianceForm appliance={appliances} warrantyCheck={warrantyCheck}/>
                    </Row> 

            </Container>
         
        </Container>
    )
}