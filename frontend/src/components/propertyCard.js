import axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const PropertyCard = ({property}) =>{

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const navigate = useNavigate();
    const viewProperty = (id) => navigate("/taskList/" + id);

    const [show, setShow] = useState(false);

    const deleteProperty = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`/api/delproperty/${id}`, {});
        } catch (error) {
            console.error(error.response.data);
        }
        alert("Property removed succesfully");
        handleClose();
    }


    return(
        <>
            <Card className="m-5 text-center blue-border">
                <Card.Body className="align-items-center">
                <Card.Title className="blue-header">
                    {property.address}
                </Card.Title>
                <Card.Text className="blue-secondary-header">
                    {property.city}
                </Card.Text>
                <Card.Text className="blue-secondary-header">
                    {property.province}
                </Card.Text>
                <Button
                    type="submit"
                    className="mx-2 green-button"
                    onClick={() => viewProperty(property.id)}
                >
                    View Property
                </Button>
                <Button
                    type="submit"
                    className="mx-2 green-button"
                    onClick={handleOpen}
                >
                    Delete Property
                </Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="blue-text">
                        Delete Property
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="blue-text">
                    Are you sure you want to delete this property?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="blue-button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="green-button" onClick={() => deleteProperty(property.id)}>
                        Delete Property
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

