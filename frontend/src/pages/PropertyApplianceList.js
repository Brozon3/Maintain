import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "../components/ApplianceForm";

export const PropertyApplianceList = ({properties}) => {

    const { id } = useParams();

    const findProperty = () => {
        for (let i=0; i < properties.length; i++){
            if (properties[i].id === parseInt(id)){
                return properties[i];
            }
        }
    }

    const property = findProperty();

    const warrantyCheck = (purchaseDate, warrantyLength) => {
        if (purchaseDate === ""){
            return "--";
        }

        const pDate = new Date(purchaseDate);
        
        const warrantyExpireDate = new Date(pDate);
        warrantyExpireDate.setFullYear(warrantyExpireDate.getFullYear() + warrantyLength);
        
        const today = new Date();
        
        if (today < warrantyExpireDate) {
            return "No";
        } else {
            return "Yes";
        }
    }

    return (
        <Container className="text-center main">

            <h1 className="p-3 mb-3 blue-header">{property.address}</h1>
            <h2 className="blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

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
                {property.applianceList.map((appliance, i) => {
                    if (appliance.empty === false){
                        return(
                            <Row className="my-3 table-input" key={i}>
                                <Col lg={1}>{appliance.applianceType}</Col>
                                <Col lg={2}>{appliance.manufacturer}</Col>
                                <Col lg={2}>{appliance.modelNumber}</Col>
                                <Col lg={2}>{appliance.serialNumber}</Col>
                                <Col lg={2}>{appliance.purchaseDate}</Col>
                                <Col lg={1}>{appliance.warrantyLength}</Col>
                                <Col lg={1}>{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</Col>
                                <Col lg={1}><a href="/" className="link">User Manual</a></Col>
                            </Row>
                        )
                    } else {
                        return(
                            <ApplianceForm appliance={appliance} warrantyCheck={warrantyCheck} key={i}/>
                        )
                    }
                })}
            </Container>
         
        </Container>
    )
}