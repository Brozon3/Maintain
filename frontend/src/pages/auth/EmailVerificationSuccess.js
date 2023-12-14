import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="mb-3 p-3 blue-header">Success!</h1>
      <p className="blue-secondary-header">
        Thanks for verifying your email, now you can use all the app's features.
      </p>
      <Button className="green-button mx-3" onClick={() => navigate("/")}>
        Go to home page
      </Button>
    </Container>
  );
};
