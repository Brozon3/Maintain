import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Form } from "react-bootstrap";

export const FeatureSelect = ({ register }) => {

    const { propertyID } = useParams();

    const fetchFeatures = async () => {
        const result = await axios.get(`/api/propertyFeatures/${propertyID}`)
        console.log(result.data.getFeatures);
        if (result.data.getFeatures) {
            setFeatures(result.data.getFeatures);
        } else {
            setFeatures([]);
        }
        
    }

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetchFeatures();
    }, [])

    return(
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="feature">
            Feature:{" "}
          </Form.Label>
          <Form.Select
            id="feature"
            {...register("feature", { required: true })}
          >
            {features.map((feature, i) => {
              return(
                <option key={i} value={feature.featureID}> {feature.featureType} </option>
              )
            })}
          </Form.Select>
        </Form.Group>
    )
}