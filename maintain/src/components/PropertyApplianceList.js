import React from "react";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router';

export const PropertyApplianceList = () => {

    const navigate = useNavigate();
    const taskList = () => navigate('/taskList');
    const applianceList = () => navigate('/applianceList');

    return (
        <Container className="w-75 text-center" style={{backgroundColor: "#F8F9FA", height: 800}} >
            <h1 style={{color: "#2A4D6A"}}>1 First St.</h1>
            <h2 className="mb-5" style={{color: "#2A4D6A"}}>St. John's, NL</h2>
            <Row className="justify-content-md-center">
                <Col md={{ span: 4, offset: 0}}>
                    <Button type="submit" className="my-2" onClick={taskList} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A", width: "18rem", height: "3rem"}}>
                        View Tasks
                    </Button>
                </Col>
                <Col md={{ span: 4, offset: 0 }}>
                    <Button type="submit" className="my-2" onClick={applianceList} style={{backgroundColor: "#17A589", color: "#F8F9FA", borderColor: "#2A4D6A", width: "18rem", height: "3rem"}} disabled>
                        View Appliances
                    </Button>
                </Col>
            </Row>
            <Row>
                <div>
                <Table responsive="sm" className="my-5" style={{border: "10px solid", borderColor: "#2A4D6A", borderRadius: "10px"}}>
                    <thead style={{color: "#F8F9FA"}}>
                    <tr>
                        <th>Appliance Name</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Purchase Date</th>
                        <th>Warranty Period</th>
                        <th>Warranty Expired</th>
                        <th>User Manual</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Washer</td>
                        <td>LG</td>
                        <td>LT43A3AWW</td>
                        <td>57G43031</td>
                        <th>May 24, 2022</th>
                        <th>2</th>
                        <th>No</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Dryer</td>
                        <td>LG</td>
                        <td>LE43A3AWW</td>
                        <td>23G65484</td>
                        <th>May 24, 2022</th>
                        <th>2</th>
                        <th>No</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Refrigerator</td>
                        <td>Samsung</td>
                        <td>RF18A5101SR/AA</td>
                        <td>23J8494</td>
                        <th>Sept 15, 2021</th>
                        <th>2</th>
                        <th>Yes</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Range</td>
                        <td>GE</td>
                        <td>JCAS300DMWW</td>
                        <td>12K1234</td>
                        <th>Oct 15, 2023</th>
                        <th>5</th>
                        <th>No</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Dishwasher</td>
                        <td>Bosch</td>
                        <td>SHE3AEM5N</td>
                        <td>09X0909</td>
                        <th>Dec 15, 2022</th>
                        <th>1</th>
                        <th>No</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Freezer</td>
                        <td>Frigidaire</td>
                        <td>FPFU10F8WF</td>
                        <td>84K2921</td>
                        <th>Feb 21, 2019</th>
                        <th>2</th>
                        <th>Yes</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    <tr>
                        <td>Water Heater</td>
                        <td>Rheem</td>
                        <td>XE40M06ST45U1</td>
                        <td>1001301831</td>
                        <th>Aug 14, 2017</th>
                        <th>3</th>
                        <th>Yes</th>
                        <td><a href="#">User Manual</a></td>
                    </tr>
                    </tbody>
                </Table>
                </div> 
            </Row>
            
        </Container>
    )
;}