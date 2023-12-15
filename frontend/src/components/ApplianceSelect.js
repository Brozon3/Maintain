import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Form } from "react-bootstrap";

export const ApplianceSelect = ({ register }) => {
  const { propertyID } = useParams();

  const [appliances, setAppliances] = useState([]);

  const fetchAppliances = async () => {
    const result = await axios.get(`/api/propertyAppliances/${propertyID}`);
    if (result.data.getAppliances) {
      setAppliances(result.data.getAppliances);
    } else {
      setAppliances([]);
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, [appliances]);

  return (
    <Form.Group className="mb-3">
      <Form.Label className="blue-text" htmlFor="propertyApplianceID">
        Appliance:{" "}
      </Form.Label>
      <Form.Select
        id="propertyApplianceID"
        {...register("propertyApplianceID", { required: true })}
      >
        {appliances.map((appliance, i) => {
          return (
            <option key={i} value={appliance.propertypplianceID}>
              {" "}
              {appliance.manufacturer +
                " " +
                appliance.model +
                " " +
                appliance.applianceType}{" "}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};
