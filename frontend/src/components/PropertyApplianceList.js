import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PropertyDoubleButton } from "./PropertyDoubleButton";
import { useParams } from "react-router";
import { ApplianceForm } from "./ApplianceForm";

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

            <h1 className="blue-header">{property.address}</h1>
            <h2 className="mb-2 blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

            <PropertyDoubleButton current={"appliance"} id={id}/>

            <Container className="blue-border my-3">
                <Row className="my-2">
                    <Col>
                        <h6>Type</h6>
                    </Col>
                    <Col>    
                        <h6>Manufacturer</h6>
                    </Col>
                    <Col>    
                        <h6>Model</h6>
                    </Col>
                    <Col>    
                        <h6>Serial Number</h6>
                    </Col>
                    <Col>    
                        <h6>Purchase Date</h6>
                    </Col>
                    <Col>    
                        <h6>Warranty Length</h6>
                    </Col>
                    <Col>    
                        <h6>Warranty Expired</h6>
                    </Col>
                    <Col>    
                        <h6>#</h6>
                    </Col>
                </Row>
                {property.applianceList.map((appliance, i) => {
                    if (appliance.empty === false){
                        return(
                            <Row className="my-2" key={i}>
                                <Col className="align-middle w-auto">{appliance.applianceType}</Col>
                                <Col className="align-middle w-auto" >{appliance.manufacturer}</Col>
                                <Col className="align-middle w-auto">{appliance.modelNumber}</Col>
                                <Col className="align-middle w-auto">{appliance.serialNumber}</Col>
                                <Col className="align-middle w-auto">{appliance.purchaseDate}</Col>
                                <Col className="align-middle w-auto">{appliance.warrantyLength}</Col>
                                <Col className="align-middle w-auto">{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</Col>
                                <Col><a href="/" className="link">User Manual</a></Col>
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


        
        /** <Container className="text-center main" >

            <h1 className="blue-header">{property.address}</h1>
            <h2 className="mb-2 blue-secondary-header">{(property.city) + ", " + (property.province)}</h2>

            <PropertyDoubleButton current={"appliance"} id={id}/>
            
            <div>
            <Table responsive="sm" className="my-5 blue-border">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Purchase Date</th>
                        <th>Warranty Length</th>
                        <th>Warranty Expired</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {property.applianceList.map((appliance, i) => {
                        if (appliance.empty === false){
                            return(
                                <tr key={i}>
                                    <td className="align-middle">{appliance.applianceType}</td>
                                    <td className="align-middle" >{appliance.manufacturer}</td>
                                    <td className="align-middle">{appliance.modelNumber}</td>
                                    <td className="align-middle">{appliance.serialNumber}</td>
                                    <td className="align-middle">{appliance.purchaseDate}</td>
                                    <td className="align-middle">{appliance.warrantyLength}</td>
                                    <td className="align-middle">{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</td>
                                    <td><a href="/" className="link">User Manual</a></td>
                                </tr>
                            )
                        } else {
                            return(                                
                                <tr key={i}>
                                    <form>
                                        <td className="align-middle">{appliance.applianceType}</td>
                                        <td>
                                            <Form.Select style={{width: "100%"}} className="w-auto">
                                                <option >--</option>
                                                <option value={"Amana"}>Amana</option>
                                                <option value={"Bosch"}>Bosch</option>
                                                <option value={"Electrolux"}>Electrolux</option>
                                                <option value={"Frigidaire"}>Frigidaire</option>
                                                <option value={"GE"}>GE</option>
                                                <option value={"Hotpoint"}>Hotpoint</option>
                                                <option value={"Kenmore"}>Kenmore</option>
                                                <option value={"KitchenAid"}>KitchenAid</option>
                                                <option value={"LG"}>LG</option>
                                                <option value={"Maytag"}>Maytag</option>
                                                <option value={"Miele"}>Miele</option>
                                                <option value={"Panasonic"}>Panasonic</option>
                                                <option value={"Speed Queen"}>Speed Queen</option>
                                                <option value={"Whirlpool"}>Whirlpool</option>
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="0123456789"/>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="ABCXYZ"/>
                                        </td>
                                        <td>
                                            <Form.Control type="date"/>
                                        </td>
                                        <td>
                                            <Form.Control type="number" placeholder="1"min={0} max={25} defaultValue={0}/>
                                        </td>
                                        <td className="align-middle">{warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}</td>
                                        <td><Button className="green-button" type="submit">+</Button></td>
                                    </form>
                                    
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
            </div> 

        </Container> **/
    )
}