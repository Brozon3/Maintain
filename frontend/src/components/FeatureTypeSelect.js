import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const FeatureTypeSelect = () => {

    const getFeatureTypes = async () => {
        const result = await axios.get("/api/FeatureTypes");
        setFeatureTypes(result.data.featureTypes);
    }

    const { register } = useForm();

    const [featureTypes, setFeatureTypes] = useState([]);

    useEffect(() => {
        getFeatureTypes();
    }, [])

    return (
        <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="featureType">
                Feature Type:{" "}
            </Form.Label>
            <Form.Select
                id="featureType"
                {...register("featureType", { required: true })}
            >
            {featureTypes.map((type, i) => {
                return(
                    <option key={i} value={type}>{type}</option>
                )
            })}
            </Form.Select>
        </Form.Group>
    )

}