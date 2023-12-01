import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export const ApplianceTypeSelect = ({ type, register }) => {

    const getApplianceTypes = async () => {
        const result = await axios.get("/api/applianceTypes");
        setApplianceTypes(result.data.applianceTypes);
    }

    const [applianceTypes, setApplianceTypes] = useState([]);

    useEffect(() => {
        getApplianceTypes();
    }, [])

    if (type === "no_label"){
        return(
            <Form.Select
                id="applianceType"
                {...register("applianceType", { required: true })}
            >
                <option value={""}>--</option>
            {applianceTypes.map((type, i) => {
                return(
                    <option key={i} value={type}>{type}</option>
                )
            })}
            </Form.Select>
        )
    } else {
        return (
        <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="applianceType">
                Appliance Type:{" "}
            </Form.Label>
            <Form.Select
                id="applianceType"
                {...register("applianceType", { required: true })}
            >
                <option value={""}>--</option>
            {applianceTypes.map((type, i) => {
                return(
                    <option key={i} value={type}>{type}</option>
                )
            })}
            </Form.Select>
        </Form.Group>
        )
    }
}