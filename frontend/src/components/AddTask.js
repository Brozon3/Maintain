import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export const AddTask = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="container main">
      <h1 className="mb-3 blue-header">Add a Task</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="description">
            Task Name:{" "}
          </Form.Label>
          <Form.Control
            type="task-name"
            placeholder="Clean the cat litter"
            id="description"
            {...register("description", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="frequency">
            Frequency:{" "}
          </Form.Label>
          <Form.Select
            id="frequency"
            {...register("frequency", { required: true })}
          >
            <option value={"Once"}>Once</option>
            <option value={"Weekly"}>Weekly</option>
            <option value={"Bi-Weekly"}>Bi-Weekly</option>
            <option value={"Monthly"}>Monthly</option>
            <option value={"Bi-Monthly"}>Bi-Monthly</option>
            <option value={"Quarterly"}>Quarterly</option>
            <option value={"Semi-Annually"}>Semi-Annually</option>
            <option value={"Annually"}>Annually</option>
            <option value={"Bi-Annually"}>Bi-Annually</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="completeBy">
            Complete by:{" "}
          </Form.Label>
          <Form.Control
            type="date"
            id="completeBy"
            {...register("completeBy", { required: true })}
          />
        </Form.Group>

        <Button type="submit" className="green-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
