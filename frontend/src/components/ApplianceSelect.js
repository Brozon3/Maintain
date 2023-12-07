import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Form } from "react-bootstrap";

export const ApplianceSelect = ({ register }) => {

    const { propertyID } = useParams();

    const [appliances, setAppliances] = useState([]);

    const fetchAppliances = async () => {
        const result = await axios.get(`/api/propertyAppliances/${propertyID}`)
        if (result.data.getAppliances) {
            setAppliances(result.data.getAppliances);
        } else {
            setAppliances([]);
        }
        
    }

    useEffect(() => {
      fetchAppliances();
    }, [appliances])

    return(
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="appliance">
            Appliance:{" "}
          </Form.Label>
          <Form.Select
            id="appliance"
            {...register("appliance", { required: true })}
          >
            {appliances.map((appliance, i) => {
              return(
                 <option key={i} value={appliance.applianceID}> {appliance.manufacturer + " " + appliance.model + " " + appliance.applianceType} </option>
              )
            })}
          </Form.Select>
        </Form.Group>
    )
}