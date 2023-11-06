import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import axios from "axios";

export const AddProperty = () => {
  // Below is related to auth for updating the user. Will implement later. Review 'Adding JWTs to the User Info Page.'
  // const user = useUser();
  // const[,setToken] = useToken();
  // const { id, email, info } = user;

  return (
    <Container className="container w-75 main">
      <h1 className="mb-3 blue-header">Add a Property</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="blue-text">Property Address: </Form.Label>
          <Form.Control type="address" placeholder="20 Fake Pl." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text">Property City: </Form.Label>
          <Form.Control type="city" placeholder="Exampleville" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text">Property Province: </Form.Label>
          <Form.Select>
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
          <Form.Label className="blue-text">Property Type: </Form.Label>
          <Form.Select>
            <option value={"Apartment"}>Apartment</option>
            <option value={"Cabin"}>Cabin</option>
            <option value={"Commercial"}>Commercial</option>
            <option value={"Condo"}>Condo</option>
            <option value={"Home"}>Home</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text">Carpet: </Form.Label>
          <Form.Select>
            <option value={"No"}>No</option>
            <option value={"Yes"}>Yes</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text">Pets: </Form.Label>
          <Form.Select>
            <option value={"No"}>No</option>
            <option value={"Yes"}>Yes</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="green-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
