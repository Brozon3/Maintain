import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { RoofField } from "../components/RoofField";
import { UseUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";

export const AddProperty = () => {
  const user = UseUser();
  const [token, setToken] = useToken();
  const { id, email, isVerified } = user;
  const [message, setMessage] = useState("");
  const [addedOrExists, setAddedOrExists] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [propertyType, setPropertyType] = useState("");
  const [roofFieldVisibile, setRoofFieldVisibile] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  useEffect(() => {
    if (propertyType === "Cabin" || propertyType === "Home") {
      setRoofFieldVisibile(true);
    } else {
      setRoofFieldVisibile(false);
    }
  }, [propertyType]);

  // Take the data.
  // send to add Property api
  // insert the new property
  // add an association with the new property.
  const onSubmit = async (data) => {
    const response = await axios.post("/api/addProperty", {
      user: user,
      data: data,
    });
    handleOpen();
    setMessage(response.data.message);
    setAddedOrExists(response.data.propertyID ? "added" : "exists");

    reset();
  };

  return (
    <>
      <Container className="container main">
        <h1 className="mb-3 p-3 blue-header">Add a Property</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="container w-50 justify-content-center"
        >
          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="address">
              Property Address:{" "}
            </Form.Label>
            <Form.Control
              type="address"
              placeholder="20 Fake Pl."
              id="address"
              {...register("address", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="city">
              Property City:{" "}
            </Form.Label>
            <Form.Control
              type="city"
              placeholder="Exampleville"
              id="city"
              {...register("city", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="prov">
              Property Province:{" "}
            </Form.Label>
            <Form.Select id="prov" defaultValue={"AB"} {...register("prov", { required: true })}>
              <option value={"AB"}>AB</option>
              <option value={"BC"}>BC</option>
              <option value={"MB"}>MB</option>
              <option value={"NL"}>NL</option>
              <option value={"NS"}>NS</option>
              <option value={"NT"}>NT</option>
              <option value={"NU"}>NT</option>
              <option value={"ON"}>ON</option>
              <option value={"PE"}>PE</option>
              <option value={"QC"}>QC</option>
              <option value={"SK"}>SK</option>
              <option value={"YT"}>YT</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="type">
              Property Type:{" "}
            </Form.Label>
            <Form.Control
              as={"select"}
              defaultValue={"Apartment"}
              id="type"
              {...register("type", {
                required: true,
                onChange: (e) =>
                  setPropertyType(
                    e.target.options[e.target.selectedIndex].text
                  ),
              })}
            >
              <option value={"Apartment"}>Apartment</option>
              <option value={"Cabin"}>Cabin</option>
              <option value={"Condo"}>Condo</option>
              <option value={"Home"}>Home</option>
            </Form.Control>
          </Form.Group>

          {roofFieldVisibile && <RoofField register={register} />}

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="carpet">
              Carpet:{" "}
            </Form.Label>
            <Form.Select
              id="carpet"
              defaultValue={"No"}
              {...register("carpet", { required: true })}
            >
              <option value={"No"}>No</option>
              <option value={"Yes"}>Yes</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="pets">
              Pets:{" "}
            </Form.Label>
            <Form.Select id="pets" defaultValue={"No"} {...register("pets", { required: true })}>
              <option value={"No"}>No</option>
              <option value={"Yes"}>Yes</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="heating">
              Heating Type:{" "}
            </Form.Label>
            <Form.Select
              id="heating"
              defaultValue={"Electric"}
              {...register("heating", { required: true })}
            >
              <option value={"heating_electric"}>Electric</option>
              <option value={"heating_oil"}>Oil</option>
            </Form.Select>
          </Form.Group>

          <hr></hr>

          <Button type="submit" className="green-button mx-3">
            Submit
          </Button>
        </Form>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="blue-text">
            Property {addedOrExists}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="blue-text">{message}</Modal.Body>
        <Modal.Footer>
          <Button
            className="blue-button"
            onClick={() => navigate("/displayProperties")}
          >
            View Properties
          </Button>
          <Button className="green-button" onClick={handleClose}>
            Add Another Property
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
