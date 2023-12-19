import React, {useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { ApplianceField } from "./ApplianceField";
import axios from "axios"
import { useNavigate } from "react-router";

export const PropertyApplianceList = () => {

    const { propertyID } = useParams();

    const [appliances, setAppliances] = useState([]);
    const [noAppliancesMessage, setNoAppliancesMessage] = useState(true);

    const navigate = useNavigate();
    const addAppliance = () => {
        console.log("Hello");
        navigate("/addAppliance/" + propertyID);
    }

    const fetchAppliances = async () => {
        const result = await axios.get(`/api/propertyAppliances/${propertyID}`)
        if (result.data.getAppliances) {
            setAppliances(result.data.getAppliances);
        } else {
            setAppliances([]);
        }
        
    }
    
    useEffect (() => {
        fetchAppliances();
        if (appliances.length === 0){
            setNoAppliancesMessage(true);
        } else {
            setNoAppliancesMessage(false);
        }
    }, [appliances.length]);

    return (
        <>
            <Table responsive className="blue-border">
                <thead >
                    <tr>
                        <th className="blue-text">{"Type"}</th>
                        <th className="blue-text">{"Manufacturer"}</th>
                        <th className="blue-text">{"Model"}</th>
                        <th className="blue-text">{"Serial Number"}</th>
                        <th className="blue-text">{"Purchase Date"}</th>
                        <th className="blue-text">{"Warranty Length"}</th>
                        <th className="blue-text">{"Warranty Expired"}</th>
                        <th className="blue-text">{"Delete"}</th>
                    </tr>
                </thead>
                <tbody>
                    {appliances.map((appliance, i) => {
                        return(
                            <ApplianceField appliance={appliance} i={i} fetchAppliances={() => fetchAppliances()} key={i}/>
                        )
                    })}
                </tbody>
            </Table>
            {noAppliancesMessage && <h1 className="green-secondary-header mb-3">{"There are currently no appliances associated with this property."}</h1>}
            
            <Button type="submit" className="green-button mx-3" onClick={() => addAppliance()}>
                Add Appliance
            </Button>
        </>
    )
}