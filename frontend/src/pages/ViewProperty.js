import React, { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PropertyTaskList } from "../components/PropertyTaskList";
import axios from "axios";
import { PropertyApplianceList } from "../components/PropertyApplianceList";
import { PropertyFeatureList } from "../components/PropertyFeatureList";

export const ViewProperty = () => {
  const { propertyID } = useParams();

  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      const result = await axios.get(`/api/properties/${propertyID}`);
      if (result.data) {
        setProperty(result.data);
      } else {
        setProperty([]);
      }
    };
    fetchProperty();
  }, [property.propertyID]);

  return (
    <>
      <Container className="text-center main">
        <h1 className="p-3 mb-2 blue-header">{property.address}</h1>
        <h2 className="mb-2 p-3 blue-secondary-header">
          {property.type}
        </h2>
        <h2 className="mb-2 p-3 blue-secondary-header">
          {property.city + ", " + property.prov}
        </h2>

        <Accordion className="green-border" defaultActiveKey={["2"]}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="blue-secondary-header">Features</Accordion.Header>
            <Accordion.Body>
              <PropertyFeatureList />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="blue-secondary-header">
              Appliances
            </Accordion.Header>
            <Accordion.Body>
              <PropertyApplianceList />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="blue-secondary-header">Tasks</Accordion.Header>
            <Accordion.Body>
              <PropertyTaskList />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <br></br>
        <br></br>
        <br></br>
      </Container>
    </>
  );
};
