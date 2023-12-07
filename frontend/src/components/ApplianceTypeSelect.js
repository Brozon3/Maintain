import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export const ApplianceTypeSelect = ({ register }) => {

    const getApplianceTypes = async () => {
        const result = await axios.get("/api/applianceTypes");
        setApplianceTypes(result.data.applianceTypes);
    }

    const [applianceTypes, setApplianceTypes] = useState([]);

    useEffect(() => {
        getApplianceTypes();
    }, [])

    return (
        <Form.Group className="mb-3">
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
