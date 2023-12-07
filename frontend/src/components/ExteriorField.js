import { Form } from "react-bootstrap";

export const ExteriorField = ({ register }) => {
  return (
    <Form.Group className="mb-3">
        <Form.Label className="blue-text" htmlFor="exterior">
            Exterior Type:{" "}
        </Form.Label>
        <Form.Select
            id="exterior"
            defaultValue={"Vinyl"}
            {...register("exterior", { required: true })}
        >
            <option value={"exterior_vinyl"}>Vinyl</option>
            <option value={"exterior_aluminum"}>Aluminum</option>
            <option value={"exterior_paint"}>Paint</option>
        </Form.Select>
    </Form.Group>
  );
};
