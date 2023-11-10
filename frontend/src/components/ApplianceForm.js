import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';

export const ApplianceForm = ({properties, appliance, warrantyCheck}) => {    
    
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="my-3 table-input">
                <Col lg={1}>
                    {appliance.applianceType}  
                </Col>
                <Col lg={2}>
                    <Form.Select name="brand" className="table-input" {...register("brand", { required: true })}>
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
                </Col>
                <Col lg={2}>
                    <Form.Control type="text" placeholder="0123456789" name="model" className="table-input" {...register("model", { required: true })}/>
                </Col>
                <Col lg={2}>
                    <Form.Control type="text" placeholder="ABCXYZ" name="serialNumber" className="table-input" {...register("serialNumber", { required: true })}/>
                </Col>
                <Col lg={2}>
                    <Form.Control type="date" className="table-input" name="purchaseDate" {...register("purhcaseDate", { required: true })}/>
                </Col>
                <Col lg={1}>
                    <Form.Control type="number" className="table-input" placeholder="1" min={0} max={25} defaultValue={0} name="warrantyLength" {...register("warrantyLength", { required: true })}/>
                </Col>
                <Col lg={1}>
                    {warrantyCheck(appliance.purchaseDate, appliance.warrantyLength)}
                </Col>
                <Col lg={1}><Button className="green-button" type="submit">+</Button></Col>
            </Row>
        </Form>
    )
}