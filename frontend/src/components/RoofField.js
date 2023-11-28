import { Form } from "react-bootstrap";

export const RoofField = ({ register }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="blue-text" htmlFor="roof">
        Roof:{" "}
      </Form.Label>
      <Form.Control
        as={"select"}
        id="roof"
        {...register("roof", { required: true })}
      >
        <option value={"roof_shingles"}>Shingles</option>
        <option value={"roof_metal"}>Metal</option>
      </Form.Control>
    </Form.Group>
  );
};
