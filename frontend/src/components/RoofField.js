import { Form } from "react-bootstrap";

export const RoofField = ({register}) => {

    return (
        <Form.Group className="mb-3">
            <Form.Label className="blue-text" htmlFor="roof">
                Roof:{" "}
            </Form.Label>
            <Form.Control as={"select"} id="roof" {...register("roof", { required: true })}>
                <option value={"Shingles"}>Shingles</option>
                <option value={"Metal"}>Metal</option>
            </Form.Control>
        </Form.Group>
    )

}