import React from "react";
import {Container, Row, Col} from "react-bootstrap";

export function DisplayProperties(){
    const properties = 2;
    return(
        <Container className="container w-75" style={{backgroundColor: "#F8F9FA", height: 800}} >
            <Row style={{height: 400}}>
                <Col md={{ span: 4, offset: 1 }}>
                    <Container className="border border-success my-5" style={{height: 300, color:'#17A589'}}>
                        <Row>
                            <Col><h1>1 First Street</h1></Col>
                        </Row>
                        <Row>
                            <Col><h3>St. John's, NL</h3></Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={{ span: 4, offset: 2 }}>
                    <Container className="border border-success my-5" style={{height: 300, color:'#17A589', borderColor:'#17A589'}}>
                        <Row>
                            <Col><h1>21 Jump Street</h1></Col>
                        </Row>
                        <Row>
                            <Col><h3>Torbay, NL</h3></Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <Container className="border border-success my-3" style={{height: 300, color:'#17A589'}}>
                        <h1>+</h1>
                        <h3>Add New Property</h3>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
};

