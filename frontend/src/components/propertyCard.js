import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

// DO NOT CHANGE FILENAME TO PropertyCard.js Everything will break. I don't know why. But I know it works

export const PropertyCard = ({ property, onDelete }) => {
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const navigate = useNavigate();
  const viewProperty = (id) => navigate("/viewproperty/" + id);

  const [show, setShow] = useState(false);

  const deleteProperty = async (propertyID) => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <Card className="m-5 text-center blue-border">
        <Card.Body className="align-items-center">
          <Card.Title className="blue-header">{property.address}</Card.Title>
          <Card.Text className="blue-secondary-header">
            {property.city}
          </Card.Text>
          <Card.Text className="blue-secondary-header">
            {property.prov}
          </Card.Text>
          <Button
            type="submit"
            className="mx-2 green-button"
            onClick={() => viewProperty(property.propertyID)}
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
          <Modal.Title className="blue-text">Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body className="blue-text">
          Are you sure you want to delete this property?
        </Modal.Body>
        <Modal.Footer>
          <Button className="blue-button" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="green-button" onClick={deleteProperty}>
            Delete Property
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
