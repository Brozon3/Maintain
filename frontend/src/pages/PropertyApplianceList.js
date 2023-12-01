import React, {useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { PropertyDoubleButton } from "../components/PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "../components/ApplianceForm";
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
        setAppliances(result.data.getAppliances);
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleDeleteAppliance = async (applianceID) => {
        try {
          await axios.delete(`/api/deleteAppliance`, {
            data: {
              propertyID,
            },
          });
          handleOpen();
        } catch (error) {
          console.error("Error deleting property:", error);
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
                
                {appliances.map((appliance, i) => {
                    return(
                        <Row className="my-3 table-input" key={appliance.serialNumber + i}>
                            <Col lg={1}>{appliance.applianceType}</Col>
                            <Col lg={2}>{appliance.manufacturer}</Col>
                            <Col lg={2}>{appliance.model}</Col>
                            <Col lg={2}>{appliance.serialNumber}</Col>
                            <Col lg={2}>{appliance.purchaseDate.substring(0, 10)}</Col>
                            <Col lg={1}>{appliance.warrantyLength}</Col>
                            <Col lg={1}>{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</Col>
                            <Col lg={1}><Button className="blue-button" onClick={handleOpen}>-</Button></Col>
                        </Row>
                    )   
                })}
   
                <ApplianceForm type={"no_label"}/>                

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="blue-text">Delete Appliance</Modal.Title>
                </Modal.Header>
                <Modal.Body className="blue-text">
                    Are you sure you want to delete this appliance?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="blue-button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={handleDeleteAppliance}>
                        Delete Appliance
                    </Button>
                </Modal.Footer>
            </Modal>
         
        </Container>

    )
}